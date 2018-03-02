import { Router } from "express";
import topicRouter from "./topics";
import authRouter from "./auth";
import usersRouter from "./users";
import mentorProfileRouter from "./mentorProfile";
import mentorSkillsRouter from "./mentorSkills";
import menteeProfile from './menteeProfile';
import menteeTopics from './menteeTopics';
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
router.use("/mentorprofile", mentorProfileRouter);
router.use('/mentorskills', mentorSkillsRouter);
router.use('/menteeprofile', menteeProfile);
router.use('/menteetopics', menteeTopics);
router.use("/users", usersRouter);

export default router;