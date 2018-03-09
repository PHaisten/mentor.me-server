import { executeQuery, generatePlaceholders } from './config/db';

class Table {
	constructor(tableName) {
		if (!tableName) {
			throw new TypeError(
				'You must pass a MySQL table name into the Table object constructor.'
			);
		}
		this.tableName = tableName;
	}

	getOne(id) {
		let sql = `SELECT * FROM ${this.tableName} WHERE id = ${id};`;
		return executeQuery(sql, [id]).then(results => results[0]);
	}

	getAll() {
		let sql = `SELECT * FROM ${this.tableName}`;
		return executeQuery(sql);
	}

	find(query) {
		let columns = Object.keys(query);
		let values = Object.values(query);
		let conditions = columns.map(columnName => {
			return `${columnName} LIKE ?`;
		});
		let sql = `SELECT * FROM ${this.tableName} WHERE ${conditions.join(
			' AND '
		)};`;
		return executeQuery(sql, values);
	}

	insert(row) {
		let columns = Object.keys(row);
		let values = Object.values(row);
		let placeholderString = generatePlaceholders(values);
		let sql = `INSERT INTO ${this.tableName} (${columns.join(
			','
		)}) VALUES (${placeholderString});`;
		return executeQuery(sql, values).then(results => ({
			id: results.insertId
		}));
	}

	update(id, row) {
		let columns = Object.keys(row);
		let values = Object.values(row);
		let updates = columns.map(columnName => {
			return `${columnName} = ?`;
		});
		let sql = `UPDATE ${this.tableName} SET ${updates.join(
			','
		)} WHERE id = ${id};`;
		return executeQuery(sql, values);
	}

	delete(id) {
		let sql = `DELETE FROM ${this.tableName} WHERE id = ${id}`;
		return executeQuery(sql);
	}
	findMentorByTopics(id) {
		let sql = `SELECT 
        u.firstname as firstname, 
        u.lastname as lastname,
        u.email as contact,
        m.hourly as cost, 
        m.location as location, 
        m.qualifications as qualifications,
        m.rate as rate,
        m.bio as bio 
        FROM ${this.tableName} t 
        JOIN mentortopics mt on mt.topicid = t.id
        JOIN mentors m on m.id = mt.mentorid 
        JOIN users u on u.id = m.userid
        WHERE t.id = ${id}`;
		return executeQuery(sql);
	}
	findMenteeByTopics(id) {
		let sql = `SELECT 
        u.firstname as firstname, 
        u.lastname as lastname,
        u.email as contact,
        m.location as location, 
        m.bio as bio 
        FROM ${this.tableName} t 
        JOIN menteetopics mt on mt.topicid = t.id
        JOIN mentees m on m.id = mt.menteeid 
        JOIN users u on u.id = m.userid
        WHERE t.id = ${id}`;
		return executeQuery(sql);
	}
	getAllMentors() {
		let sql = `SELECT 
        u.firstname as firstname, 
        u.lastname as lastname,
        u.email as contact,
        m.hourly as cost, 
        m.location as location, 
        m.bio as bio,
        m.qualifications as qualifications,
        m.hourlyrate as hourlyrate,
        m.schedule as schedule,
        m._created as memberSince
        FROM ${this.tableName} m
        JOIN  users u on u.id = m.userid`;
		return executeQuery(sql);
	}
	getMentorProfile(id) {
		let sql = `SELECT 
          u.firstname as firstname, 
          u.lastname as lastname,
          u.email as contact,
          m.hourly as cost, 
          m.location as location, 
          m.bio as bio,
          m.qualifications as qualifications,
          m.rate as rate,
          m.schedule as schedule,
          m._created as memberSince
          FROM ${this.tableName} m
          JOIN  users u on u.id = m.userid
          WHERE m.userid = ${id};`;
		return executeQuery(sql);
	}
	getMentorSkills(id) {
		let sql = `SELECT 
        t.name as skills
        FROM ${this.tableName} m
        JOIN  users u on u.id = m.userid
        JOIN mentortopics mt on mt.mentorid = m.id
        JOIN topics t on t.id = mt.topicid
        WHERE u.id = ${id};`;
		return executeQuery(sql);
	}
	getAllMentees() {
		let sql = `SELECT 
        u.firstname as firstname, 
        u.lastname as lastname,
        u.email as contact, 
        m.location as location, 
        m.bio as bio,
        m._created as memberSince
        FROM ${this.tableName} m
        JOIN  users u on u.id = m.userid`;
		return executeQuery(sql);
	}
	getMenteeProfile(id) {
		let sql = `SELECT 
        u.firstname as firstname, 
        u.lastname as lastname,
        u.email as contact,
        m.location as location, 
        m.bio as bio,
        m._created as memberSince
        FROM ${this.tableName} m
        JOIN users u on u.id = m.userid
        WHERE u.id = ${id};`;
		return executeQuery(sql);
	}
	getMenteeTopics(id) {
		let sql = `SELECT 
        t.name as topics
        FROM ${this.tableName} m
        JOIN  users u on u.id = m.userid
        JOIN menteetopics mt on mt.menteeid = m.id
        JOIN topics t on t.id = mt.topicid
        WHERE u.id = ${id};`;
		return executeQuery(sql);
	}
	updateMenteeProfile(id, bio, location) {
		let sql = `UPDATE mentees
        SET bio= ${`"${bio}"`}, location = ${`"${location}"`}
        WHERE id = ${id};`;
		return executeQuery(sql);
	}
	updateMentorProfile(id, hourlyrate, qualifications, location, bio) {
		let sql = `UPDATE mentors
        SET hourlyrate= ${hourlyrate},
        qualifications= ${`"${qualifications}"`},
        location= ${`"${location}"`},
        bio= ${`"${bio}"`}
        WHERE id = ${id};`;
		return executeQuery(sql);
	}

	updateMentorSchedule(
		id,
		sunday,
		monday,
		tuesday,
		wednesday,
		thursday,
		friday,
		saturday
	) {
		let sql = `INSERT INTO schedule (userid, Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday) 
        VALUES (${id}, ${`"${sunday}"`}, ${`"${monday}"`}, ${`"${tuesday}"`}, 
        ${`"${wednesday}"`}, ${`"${thursday}"`}, ${`"${friday}"`}, ${`"${saturday}"`})`;
		return executeQuery(sql);
	}
	createMentee(row) {
		let columns = Object.keys(row);
		let values = Object.values(row);
		let placeholderString = generatePlaceholders(values);
		let sql = `INSERT INTO users (${columns.join(',')}) 
        VALUES (${placeholderString});`;
		return executeQuery(sql, values).then(results => {
			let usersid = results.insertId;
			let sql = `INSERT INTO mentees(userid)
		    VALUE(${usersid});`;
			return executeQuery(sql, usersid);
		});
	}

	createMentor(row) {
		let columns = Object.keys(row);
		let values = Object.values(row);
		let placeholderString = generatePlaceholders(values);
		let sql = `INSERT INTO users (${columns.join(',')}) 
        VALUES (${placeholderString});`;
		return executeQuery(sql, values).then(results => {
			let usersid = results.insertId;
			let sql = `INSERT INTO mentors(userid)
		    VALUE(${usersid});`;
			return executeQuery(sql, usersid);
		});
	}
	getScheduleByMentorId(id) {
		let sql = `SELECT 
		s.sunday,
		s.monday,
		s.tuesday,
		s.wednesday,
		s.thursday,
		s.friday,
		s.saturday
		FROM ${this.tableName} m
		JOIN schedule s on s.userid = m.id
		WHERE m.id= ${id}`;
		return executeQuery(sql);
	}
	addMentorSkills(id, topickey) {
		let sql = `INSERT INTO mentortopics(mentorid, topicid)
		VALUES(${id}, ${topickey});`;
		return executeQuery(sql);
	}
	removeMentorSkills(id, topickey) {
		let sql = `DELETE FROM mentortopics
		WHERE (mentorid = ${id} AND topicid = ${topickey});`;
		return executeQuery(sql);
	}
	addMenteeSkills(id, topickey) {
		let sql = `INSERT INTO menteetopics (menteeid, topicid)
		VALUES(${id}, ${topickey});`;
		return executeQuery(sql);
	}
	removeMenteeSkills(id, topickey) {
		let sql = `DELETE FROM menteetopics
	WHERE (menteeid = ${id} AND topicid = ${topickey});`;
		return executeQuery(sql);
	}
}

export default Table;
