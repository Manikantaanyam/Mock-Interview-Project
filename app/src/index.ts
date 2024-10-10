import { Hono } from "hono";
import { userRouter } from "../routes/user";

const app = new Hono();

app.route("/api/user", userRouter);

export default app;
