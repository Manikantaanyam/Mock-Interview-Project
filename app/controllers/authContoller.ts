import { Context } from "hono";
import { LoginSchema, SignupSchema } from "../validationSchemas/AuthSchemas";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { use } from "hono/jsx";

export async function Signup(c: Context) {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const validate = SignupSchema.safeParse(body);
  if (!validate.success) {
    c.status(400);
    return c.json({ msg: "Incorrect inputs" });
  }

  try {
    const userr = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });

    const token = await sign(
      { id: userr.id, role: userr.role },
      c.env.JWT_SECRET_KEY
    );

    return c.json({ token, name: userr.name });
  } catch (e) {
    c.status(500);
    return c.json({ msg: "Internal server error" });
  }
}

export async function Login(c: Context) {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const validate = LoginSchema.safeParse(body);
  if (!validate.success) {
    c.status(400);
    return c.json({ msg: "Incorrect inputs" });
  }
  try {
    const userExists = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (!userExists) {
      c.status(400);
      return c.json({ msg: "User does not exist" });
    }

    const token = await sign(
      { id: userExists.id, role: userExists.role },
      c.env.JWT_SECRET_KEY
    );

    return c.json({ token, name: userExists.name });
  } catch (e) {
    c.status(500);
    return c.json({ msg: "Internal server error" });
  }
}
