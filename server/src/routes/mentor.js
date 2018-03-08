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
		.updateMentorProfile(
			req.params.id,
			req.body.hourlyrate,
			req.body.qualifications,
			req.body.location,
			req.body.bio
		)
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

router.post('/schedule/:id', (req, res) => {	//id = mentor.id
	table
		.updateMentorSchedule(
			req.params.id,
			req.body.sunday,
			req.body.monday,
			req.body.tuesday,
			req.body.wednesday,
			req.body.thursday,
			req.body.friday,
			req.body.saturday
		)
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});
export default router;
