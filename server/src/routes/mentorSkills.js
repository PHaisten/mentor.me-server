import { Router } from "express";
import Table from "../table";

let router = Router();
let table = new Table("users");

router.get("/:id", (req, res) => {  //request comes in as userid
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


export default router;  