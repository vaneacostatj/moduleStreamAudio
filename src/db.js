//const { connect } = require('mongoose');
const { db } = require ('./config')
const { MongoClient } = require('mongodb')

let connectDBM

MongoClient.connect(db, { useUnifiedTopology : true}, (err, client) =>{
  if (err){
    console.log(err);
    process.exit(0)
  }
  connectDBM = client.db('tracksdb')
})

const connectDB = () => connectDBM


module.exports = { connectDB }