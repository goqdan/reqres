const CronJob = require('cron').CronJob;

const jobs = [];

jobs.push(
    new CronJob('0 */1 * * * *', function() {
        console.log('Cron is being executed: Get latest users from reqres.in');
        const action = require("./jobs/get-users.js");
        action();
    }, null, true, 'America/Los_Angeles')
)

module.exports = jobs;
