# WINO PROJECT

## Installed request

- **Nodejs**: v14.15.4
- **Mysql**: 8.0.22

## Development environment (environments)

- **LCL**: Local environment
- **DEV**: Development environment
- **STG**: Staging environment
- **PRO**: Production environment

The configuration files with the respective environments are located in the directory `env`.
Commands that do not specify which environment will **default is `LCL`**

## Install the project and run the server

- **Step 1:** Clone git repository to your computer:
  `git clone`
- **Step 2:** Install packages:
  `npm install`
- **Step 3:** In the **env** directory:

  - Copy file `LCL.env.example`
  - Rename to `LCL.env`

    Pay attention to change the connection database parameters in local, ...

- **Step 4:** Start server
  - Run in normal mode: `npm start`
  - Run in update tracking mode: `npm run watch`

## Create database

- In **Step 4** of **Installation**, the **database migration** process will run automatically.
- If there is no auto-generated database, create a database first with the name wino in managed MySQL (eg MySQL WorkBench) and rerun **Step 4** in section **Setting** .
- To perform **seeding** (generating sample data available): 
  - Run the command `NODE_ENV=LCL npm run seed`
  - Other environment then floating corresponding `NODE_ENV=DEV` or `NODE_ENV=STG`

Refer to the list of environments in the above section.

## Sequelize

Sequelize is the ORM used in the SQL use case. See Sequelize's document (http://docs.sequelizejs.com/).
In this project, Sequelize is preconfigured to read the corresponding environment variables.

To run Sequelize commands, run the file `sequelizer.sh` and provide the same parameters as sequelize-cli

**For example:**

- `./sequelizer db:migrate`
- `./sequelizer migration:generate --env=DEV`
  if --env is not provided the default is `--env=LCL`

To create the migrate file
cd into the **migrations** folder

- `cd src/models`
- `npx sequelize-cli migration:create --name name-file`

## Build và deploy

- **Step 1:** run the command `npm run build`, the directory `dist` is created.
- **Step 2:** run command `NODE_ENV=DEV pm2 start dist/app.js`
  In case `pm2` is not installed: run command `npm install pm2 -g`
