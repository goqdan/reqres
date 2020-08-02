const config = require('config');
const mysql = require('mysql');
const util = require('util');
const CONFIG_MYSQL = config.get('mysql');

let instance = null;

class DbConnect {
    constructor() {
        this.connection = mysql.createConnection({
            ...CONFIG_MYSQL,
            password: process.env.MYSQL_PASS || CONFIG_MYSQL.password
        });
        this.connection.connect((err) => {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log("Connected to database");
        });
    }

    execute(sql, args) {
        return util.promisify(this.connection.query)
            .call(this.connection, sql, args);
    }


    escape(str) {
        return mysql.escape(str);
    }

    static getInstance() {
        if (!instance) {
            instance = new DbConnect();
        }

        return instance;
    }
}

module.exports = DbConnect;