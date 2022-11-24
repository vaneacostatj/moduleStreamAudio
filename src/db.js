const { connect } = require('mongoose');
const { MongoClient } = require('mongodb')
require('dotenv').config()

const db = process.env.MONGODB
let connectDBM

const connectDBGql = ()=>{
  try {
    connect(db)
    console.log('conect db true');
  } catch (error) {
    return error
  }
};

MongoClient.connect(db, { useUnifiedTopology : true}, (err, client) =>{
  if (err){
    console.log(err);
    process.exit(0)
  }
  connectDBM = client.db('tracksdb')
})

const connectDB = () => connectDBM


module.exports = { connectDB, connectDBGql }