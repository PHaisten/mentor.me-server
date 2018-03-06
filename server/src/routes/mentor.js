import { Router } from 'express';
import Table from '../table';

let router = Router();
let table = new Table('mentors');

router.get('/', (req, res) => {
	table
		.getAllMentors()
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});
router.get('/:id', (req, res) => {
	//request: mentor userid
	table
		.getMentorProfile(req.params.id)
		.then(results => {
			//results: mentor profile info
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});
router.get('/skill/:id', (req, res) => {
	//request: mentor userid
	table
		.getMentorSkills(req.params.id)
		.then(results => {
			//results: mentor skills
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});
router.put('/:id', (req, res) => {
	table
    .updateMentorProfile(req.params.id, req.body.bio, req.body.location, 
      req.body.hourly, req.body.rate, req.body.qualifications)
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});
router.post('/create/', (req, res) => {
	table
		.createMentor(req.body) //(req.body.firstname/lastname/email/password)
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});
export default router;
