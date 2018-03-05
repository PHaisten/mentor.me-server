import { Router } from "express";
import Table from "../table";

let router = Router();
let table = new Table("users");

router.get("/:id", (req, res) => {  //request: mentor userid
    table
        .getMentorProfile(req.params.id)
        .then(results => {        //results: mentor profile info
          res.json(results);
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500);
        });
    });
router.get("/skill/:id", (req, res) => {  //request: mentor userid
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