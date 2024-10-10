import { Context, Next } from "hono";

export async function adminMiddleware(c: Context, next: Next) {
  const role = c.get("role");
  if (role !== "ADMIN") {
    c.status(403);
    return c.json({ msg: "Access denied, admin only" });
  }
  await next();
}
