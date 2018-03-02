import { Router } from "express";
import topicRouter from "./topics";
import authRouter from "./auth";
import usersRouter from "./users";
import profileRouter from "./profile";
import userSkillsRouter from './userSkills';
import stripeDonationsRouter from "./stripeDonations";
import { isLoggedIn, tokenMiddleware } from "../middleware/auth.mw";

let router = Router();

router.use("/auth", authRouter);
router.use("/donate", stripeDonationsRouter);

// router
//   .route("*")
//   .post(tokenMiddleware, isLoggedIn)
//   .put(tokenMiddleware, isLoggedIn)
//   .delete(tokenMiddleware, isLoggedIn);

router.use("/topics", topicRouter);
router.use('/profile', profileRouter);
router.use('/userskills', userSkillsRouter);
router.use("/users", usersRouter);

export default router;