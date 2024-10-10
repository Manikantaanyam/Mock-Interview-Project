import { Hono } from "hono";
import { Login, Signup } from "../controllers/authContoller";

const userRouter = new Hono();

userRouter.post("/signup", Signup);
userRouter.post("/login", Login);

export { userRouter };
