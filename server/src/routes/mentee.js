import { Router } from 'express';
import Table from '../table';

let router = Router();
let table = new Table('mentees');

router.get('/', (req, res) => {
	table
		.getAllMentees()
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});
router.get('/:id', (req, res) => {
	//request: mentee userid
	table
		.getMenteeProfile(req.params.id)
		.then(results => {
			//results: mentee profile info
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

router.put('/:id', (req, res) => {
	//updates mentee bio and location
	table
		.updateMenteeProfile(req.params.id, req.body.bio, req.body.location)
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});
router.get('/skill/:id', (req, res) => {
	//request: mentee userid
	table
		.getMenteeTopics(req.params.id)
		.then(results => {
			//results: mentee topic/desired skill
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});
router.post('/create', (req, res) => {
	table
		.createMentee(req.body) //(req.body.firstname/lastname/email/password)
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});
router.put('/skill/:id', (req, res) => {
	table
		.addMenteeSkills(
			req.params.id,
			req.body
		)
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});
router.delete('/skill/:id', (req, res) => {
	table
		.removeMenteeSkills(
			req.params.id,
			req.body.topickey
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
