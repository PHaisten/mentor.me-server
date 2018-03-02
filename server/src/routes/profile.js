import { Router } from "express";
import Table from "../table";

let router = Router();
let table = new Table("users");

router.get("/mentee/:id", (req, res) => {  //request: mentee userid
    table.getMenteeProfile(req.params.id)
      .then(results => {        //results: mentee profile info
        res.json(results);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  });

router.put('/mentee/:id', (req, res) => {    //updates mentee bio and location
    table.updateMenteeProfile(req.params.id, req.body.bio, req.body.location)
  .then((results) => {
      res.json(results);
  }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
  });
});
router.get("/mentor/:id", (req, res) => {  //request: mentor userid
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

export default router;