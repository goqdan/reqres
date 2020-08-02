const express = require('express');
const config = require('config');
const cron = require('./cron/cron-config');
const db = require('./baseDao/mysql-connection').getInstance();

const app = express();
const CONFIG_PORT = config.get('port');

cron.forEach(job => {
    job.start();
});

app.use('/', require('./routes/main'));

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something went wrong!')
});


app.listen(CONFIG_PORT, () => {
    console.log(`Server running on port ${CONFIG_PORT}`);
});

