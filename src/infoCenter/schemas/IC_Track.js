'use strict'
const { gql } = require ('apollo-server-express');

const IC_TrackSchema = gql`
  type Track {
    _id: String
    filename: String
    length: String
    chunkSize: String
    uploadDate: String 
  }

  input Track_Filter {
    _id: String
    filename: String
  }

  input Track_Input {
    _id: String
    filename: String
  }

  type Query {
    IC_Track(filter: Track_Filter, option: Option):[Track]
    IC_Track_count(filter: Track_Filter):Int 
  }

  type Mutation {
    IC_Track_update(trackInput: Track_Input): ID
    IC_Track_delete(ID:String!): String
  }
`
module.exports = IC_TrackSchema;