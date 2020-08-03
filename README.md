## Requirements
Please make sure to have `mysql` installed in your enviroment

Also install npm package `db-migrate` globally

## Setup

After installing node dependencies, in reqres-server run following commands to create db and users table in it

```bash
npm run create_db
npm run migrate_up_all
```
In case if your mysql-server is freshly installed and/or you have troubles running these commands, you can just manually create the database(name - test_reqres), and manually run the commands in `migrations/sqls/20200801133433-create-users-table-up.sql` and `migrations/sqls/20200801140801-users-unique-key-email-up.sql`;


You can change server configuration in config folder. In case if you wish to change port number, make sure to change it also in reqres-client/package.json under proxy parameter

database.json file is part of db-migrate ecosystem, so changes should be projected there also

## Running
Run both server and client with
```bash
npm start
```
in their directories
