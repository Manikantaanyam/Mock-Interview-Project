import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export async function authMiddleware(c: Context, next: Next) {
  const header = await c.req.header("Authorization");

  if (!header) {
    c.status(400);
    return c.json({ msg: "token not provided" });
  }

  const token = header.split(" ")[1];
  if (!token) {
    c.status(400);
    return c.json({ msg: "token not provided" });
  }

  try {
    const decoded = await verify(token, c.env.JWT_SECRET_KEY);
    c.set("userId", decoded.id);
    c.set("role", decoded.role);
    await next();
  } catch (e) {
    c.status(400);
    return c.json({ msg: "Not logged in" });
  }
}
