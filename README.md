## Requirements
Please make sure to have `mysql` installed in your enviroment

Also install npm package `db-migrate` globally

## Setup

After installing node dependencies, run following commands to create db and users table in it

```bash
npm run create_db
npm run migrate_up_all
```
You can change server configuration in config folder. In case if you wish to change port number, make sure to change it also in ./client/package.json under proxy parameter

database.json file is part of db-migrate ecosystem, so changes should be projected there also

## Running
Run server in root directory
```bash
npm start
```
Run react app in ./client
```bash
npm start
```

