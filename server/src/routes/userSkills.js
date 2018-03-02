import { Router } from "express";
import Table from "../table";

let router = Router();
let table = new Table("users");

router.get("/mentor/:id", (req, res) => {  //request: mentor userid
    table
      .getMentorSkills(req.params.id)
      .then(results => {        //results: mentor skills
        res.json(results);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  });  

  router.get("/mentee/:id", (req, res) => {  //request: mentee userid
    table
      .getMenteeTopics(req.params.id)
      .then(results => {        //results: mentee topic/desired skill
        res.json(results);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  });  

export default router;  