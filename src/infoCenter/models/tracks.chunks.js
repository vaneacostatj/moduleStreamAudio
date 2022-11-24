'use strict'
const { Schema, model } = require('mongoose');

const collectionName = "tracks.chunks"

const schema = Schema({
  _id : String,
  files_id: String,
  n: String,
  data: String,
}, {
  Strict: false, 
  collection: collectionName,
})


module.exports = model(collectionName, schema); 