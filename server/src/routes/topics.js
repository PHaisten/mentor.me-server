import { Router } from "express";
import Table from "../table";

let router = Router();
let topicsTable = new Table("MentorTopics");

router.get("/:id", (req, res) => {  //request comes in as topicName
  topicsTable
    .findTopics(req.params.id)
    .then(results => {      //results send back mentorName
      res.json(results);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

export default router;
