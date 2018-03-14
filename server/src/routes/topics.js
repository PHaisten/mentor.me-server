import { Router } from 'express';
import Table from '../table';

let router = Router();
let topicsTable = new Table('topics');

//Testing to get all topics to populate for autocomplete
router.get('', (req, res) => {
	topicsTable
		.getAllTopics()
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

router.get('/mentors/:id', (req, res) => {
	//request comes in as topicName
	topicsTable
		.findMentorByTopics(req.params.id)
		.then(results => {
			//results send back mentorId
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});
router.get('/mentees/:id', (req, res) => {
	//request comes in as topicName
	topicsTable
		.findMenteeByTopics(req.params.id)
		.then(results => {
			//results send back menteeId
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

export default router;
