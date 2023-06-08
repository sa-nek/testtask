# Test Task

Simple backend API based on Express, PostgreSQL with Sequelize ORM.

## Environment Variables

To run this project, you will need to create .env file. Add the following environment variables:

`JWT_SECRET` - Secret for JWT token

`POSTGRES_HOST` - PostgreSQL host

`POSTGRES_USER` - PostgreSQL user

`POSTGRES_PASSWORD` - PostgreSQL password

`POSTGRES_DATABASE` - Name of your database

## How to run

Install packages

```bash
  npm install
```

To run with node type:

```bash
  npm run start
```

To run with nodemon:

```bash
  npm run start:dev
```

## API endpoints

### Register user

```http
  POST /auth/register
```

#### To register as admin/boss:

```json
{
  "first_name": "firstname",
  "last_name": "lastname",
  "email": "email@email.com",
  "password": "password",
  "role": "role"
}
```

#### Role must be:

```json
{
	"role":"admin",
}
OR
{
	"role":"boss",
}
```

#### To register as employee:

```json
{
  "first_name": "firstname",
  "last_name": "lastname",
  "email": "email@email.com",
  "password": "password",
  "role": "role",
  "bossId": "uuid value"
}
```

### Login

```http
  POST /auth/register
```

#### To login:

```json
{
  "email": "email@email.com",
  "password": "password"
}
```

### To get all users(returned value is based on your role):

#### Provide Bearer token and make request to

```http
  GET /users
```

### To change employee boss:

#### Provide Bearer token and make request to

```http
  GET /users/changeboss
```

#### Data:

```json
{
  "employeeId": "uuid of employee",
  "newBossId": "uuid of new boss"
}
```
