const axios = require('axios');
const userSchema = require('../../schemas/joi/user');
const db = require('../../baseDao/mysql-connection').getInstance();

const getUsers = async () => {
    try {
        const response = await axios.get('https://reqres.in/api/users');
        if (response.data.hasOwnProperty('data') && Array.isArray(response.data.data)) {
            let incomingEmails = [];
            let ourUsers = [];
            let querifyInfo = [];
            let userInfo = response.data.data;
            
            userInfo = userInfo.filter(info => {
                let validationTick = userSchema.validate(info);
                if (validationTick.hasOwnProperty('error')) {
                    return false;
                }
                incomingEmails.push(db.escape(info.email.trim()));
                return true;
            });

            let checkExistence = await db.execute("SELECT `email` FROM `user` WHERE `email` IN (" + incomingEmails.join(',') + ")");

            ourUsers = checkExistence.map(el => el.email);

            for (let data of userInfo) {
                if (!ourUsers.includes(data.email.trim())) {
                    let string = "(";
                    string += db.escape(data.first_name.trim()) + ", ";
                    string += db.escape(data.last_name.trim()) + ", ";
                    string += db.escape(data.email.trim()) + ", ";
                    string += db.escape(data.avatar.trim());
                    string += ")";
                    querifyInfo.push(string);
                }
            }
            if (querifyInfo.length) {
                stringifyInfo = querifyInfo.join(',');
                let sql = "INSERT INTO `user` (`first_name`, `last_name`, `email`, `avatar`) VALUES " + stringifyInfo;
                let queryResult = await db.execute(sql);
                console.log(queryResult);
            } else {
                console.log('No new records to add');
            }
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = getUsers;