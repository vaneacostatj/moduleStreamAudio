'use strict'
const { Schema, model } = require('mongoose');

const collectionName = "tracks.files"

const schema = Schema({
  _id : String,
  filename: {type:String, required:true},
  length: String,
  chunkSize: String,
  uploadDate: String,
}, {
  Strict: false, 
  collection: collectionName,
})


module.exports = model(collectionName, schema); 