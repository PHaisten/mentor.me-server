import { Router } from "express";
import Table from "../table";

let router = Router();
let table = new Table("users");

router.get("/:id", (req, res) => {  //request: userid
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
