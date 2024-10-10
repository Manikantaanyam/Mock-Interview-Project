import { Hono } from "hono";
import { Login, Signup } from "../controllers/authContoller";
import { Interview } from "../controllers/Interview";
import { authMiddleware } from "../middleware/authMiddleware";

const userRouter = new Hono();

userRouter.post("/signup", Signup);
userRouter.post("/login", Login);
userRouter.post("/start", authMiddleware, Interview);

export { userRouter };
