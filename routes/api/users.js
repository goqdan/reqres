const express = require('express');
const users = express.Router();
const db = require('../../baseDao/mysql-connection').getInstance();

users.get('/search', async (req, res, next) => {
    let firstName = req.query.firstName ? req.query.firstName.trim().toLowerCase() : '';
    let lastName = req.query.lastName ? req.query.lastName.trim().toLowerCase() : '';
    let sqlString = "SELECT * from `user`";
    let args = [];
    if (firstName.length) {
        sqlString += " WHERE LOWER(`first_name`) LIKE ? ";
        args.push('%' + firstName + '%');
        if (lastName.length) {
            sqlString += " AND LOWER(`last_name`) LIKE ? ";
            args.push('%' + lastName + '%');
        }
    } else if (lastName.length) {
        sqlString += " WHERE LOWER(`last_name`) LIKE ? ";
        args.push('%' + lastName + '%');
    }
    try {
        const userQuery = await db.execute(sqlString, args);
        res.json(userQuery);

    } catch (error) {
        next(error)
    }
});

module.exports = users;