import { executeQuery, generatePlaceholders } from './config/db';

class Table {
    constructor(tableName) {
        if (!tableName) {
            throw new TypeError('You must pass a MySQL table name into the Table object constructor.');
        }
        this.tableName = tableName;
    }

    getOne(id) {
        let sql = `SELECT * FROM ${this.tableName} WHERE id = ${id};`;
        return executeQuery(sql, [id])
        .then((results) => results[0]);
    }

    getAll() {
        let sql = `SELECT * FROM ${this.tableName}`;
        return executeQuery(sql);
    }

    find(query) {
        let columns = Object.keys(query);
        let values = Object.values(query);
        let conditions = columns.map((columnName) => {
            return `${columnName} LIKE ?`;
        });
        let sql = `SELECT * FROM ${this.tableName} WHERE ${conditions.join(' AND ')};`;
        return executeQuery(sql, values);
    }

    insert(row) {
        let columns = Object.keys(row);
        let values = Object.values(row);
        let placeholderString = generatePlaceholders(values);
        let sql = `INSERT INTO ${this.tableName} (${columns.join(',')}) VALUES (${placeholderString});`;
        return executeQuery(sql, values)
        .then((results) => ({id: results.insertId }));
    }

    update(id, row) {
        let columns = Object.keys(row);
        let values = Object.values(row);
        let updates = columns.map((columnName) => {
            return `${columnName} = ?`;
        });
        let sql = `UPDATE ${this.tableName} SET ${updates.join(',')} WHERE id = ${id};`;
        return executeQuery(sql, values);
    }

    delete(id) {
        let sql = `DELETE FROM ${this.tableName} WHERE id = ${id}`;
        return executeQuery(sql);
    }
    findTopics(id) {
        let sql = `SELECT 
        u.firstname as firstname, 
        u.lastname as lastname,
        m.hourly as cost, 
        m.location as location, 
        m.bio as bio 
        FROM ${this.tableName} mt 
        JOIN mentors m on  m.id = mt.mentorid 
        JOIN users u on u.id = m.userid
        JOIN topics t on t.id = mt.topicid
        WHERE t.id = ${id}`;
        return executeQuery(sql);
      };
      getMentorProfile(id) {
          let sql = `SELECT 
          u.firstname as firstname, 
          u.lastname as lastname,
          u.email as email,
          m.hourly as cost, 
          m.location as location, 
          m.bio as bio,
          m.qualifications as experience,
          m.rate as rate,
          m.schedule as schedule,
          m._created as memberSince
          FROM ${this.tableName} u
          JOIN  mentors m on u.id = m.userid
          WHERE u.id = ${id};`
          return executeQuery(sql);
      };
      getMentorSkills(id) {
        let sql = `SELECT 
        t.name as skills
        FROM ${this.tableName} u
        JOIN  mentors m on u.id = m.userid
        JOIN mentortopics mt on mt.mentorid = m.id
        JOIN topics t on t.id = mt.topicid
        WHERE u.id = ${id};`
        return executeQuery(sql);
    };
    getMenteeProfile(id) {
        let sql = `SELECT 
        u.firstname as firstname, 
        u.lastname as lastname,
        u.email as email,
        m.location as location, 
        m.bio as bio,
        m._created as memberSince
        FROM ${this.tableName} u
        JOIN mentees m on u.id = m.userid
        WHERE u.id = ${id};`
        return executeQuery(sql);
    }
    getMenteeTopics(id) {
        let sql = `SELECT 
        t.name as topics
        FROM ${this.tableName} u
        JOIN  mentees m on u.id = m.userid
        JOIN menteetopics mt on mt.menteeid = m.id
        JOIN topics t on t.id = mt.topicid
        WHERE u.id = ${id};`
        return executeQuery(sql);
    };
    updateMenteeProfile(id, bio, location){
        let sql = 
        `UPDATE mentees
        SET bio= ${`"${bio}"`}, location = ${`"${location}"`}
        WHERE userid = ${id};`
        return executeQuery(sql);
    }
}

export default Table;