import { Router } from "express";
import topicRouter from "./topics";
import authRouter from "./auth";
import usersRouter from "./users";
import menteeRouter from './mentee';
import mentorRouter from './mentor';
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
router.use('/mentee', menteeRouter);
router.use('/mentor', mentorRouter);
router.use("/users", usersRouter);

export default router;