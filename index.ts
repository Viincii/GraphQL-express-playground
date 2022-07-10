import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String,
    name: String,
    date: String,
    version: Int,
    me: User
  }
  
  type User {
    firstName: String,
    lastName: String,
  }
  
`);
const user = {
    firstName: 'Vincent',
    lastName: 'Mignot'
}

const root = {
    hello: () => 'Hello world!',
    name: () => 'Vincent Mignot',
    date: () => '10/07/22',
    version: () => '1',
    me: () => user
};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(port, () => {
    console.log(`'Now browse to localhost:${port}/graphql'`);
});
