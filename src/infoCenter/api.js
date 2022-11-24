
const express = require('express');
const { connectDBGql } = require('../db');
const { ApolloServer } = require('apollo-server-express');
//-------------------------------------------
const  typeDefs  = require('./merge/mergeSchema');
const  resolvers  = require('./merge/mergeResolver');
const { makeExecutableSchema } = require('@graphql-tools/schema');
//--------------- cambio de la interfaz --------------------
const { ApolloServerPluginLandingPageProductionDefault } = require('apollo-server-core');
//-------------------------------------------

const app = express();

app.get('/', (req, res) => res.send('welcome'))
connectDBGql(); 


async function startInfoCenter({port}) {
  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const apolloServer = new ApolloServer({
    schema,
    //--------------- cambio de la interfaz --------------------
    plugins: [ApolloServerPluginLandingPageProductionDefault({
      embed: true
    })]
  })

  await apolloServer.start();
  apolloServer.applyMiddleware({app})

  app.use('*',  (req, res) => res.send('Not found'));

  app.listen(port, ()=> {
    console.log(`🚀🚀 server on port ${port}`) 
  })
}

module.exports ={
  startInfoCenter
}
