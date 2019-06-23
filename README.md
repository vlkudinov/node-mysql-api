# node-mysql-passport-api

Simple API on Node.js + Express.js + MySQL + Passport.js with admin panel and uploading images to Amazon S3

## Installation
```
$ git clone https://github.com/vlkudinov/node-mysql-passport-api.git

$ npm install

$ npm start
```
## App
```
http://localhost:5000
```
## Api Routes
```
GET    api/countries
GET    api/countries/1
POST   api/countries
PATCH  api/countries/1
DELETE api/countries/1
```
## Demo

Running version of the app at: https://node-mysql-restapi.herokuapp.com/

login: admin
password: 12345

## .env
Your .env file must be something like this
```
//S3
S3_BUCKET_NAME=s3-bucket-name
AWS_ACCESS_KEY_ID=your-s3-access-id
AWS_SECRET_ACCESS_KEY=your-s3-secret-key

//DB
MYSQL_HOST=db-name
MYSQL_USER=db-user
MYSQL_PASSWORD=db-password
MYSQL_DB=database-name
```
