const {
  tracksChunks,
  tracksFiles
} = require('../models')
const { handlePagination } = require('@codecraftkit/utils')


const IC_Track_update = async(_, {trackInput}) =>{
  try {
    let {
      _id,
      filename
    } = trackInput

    await tracksFiles.findByIdAndUpdate(_id,{
      filename
    })
    return _id
  } catch (error) {
    console.error(error);
    return error
  }
}

const IC_Track = async (_, {filter={}, options={}}) =>{
  try {
    let query = {}
    let {_id, filename} = filter
    let {skip, limit} = handlePagination(options)
    

    if(_id) query._id = _id 
    if(filename) query.filename = { $regex: filename, $options: 'i' }

    const find = tracksFiles.find(query) 

    if(skip){
      find.skip(skip)
    }
    if(limit){
      find.limit(limit)
    }
     
    return await find.lean()
    
  } catch (error) {
    console.error(error);
    return error;
  } 
}

const IC_Track_count = async (_, {filter={}}) =>{
  try {
    const count = await IC_Track(_, {filter})
    return count.length
  } catch (error) {
    return error
  }
}

const IC_Track_delete = async (_, {ID}) => {
  try {    
    await tracksFiles.deleteMany({_id: ID})
    await tracksChunks.deleteMany({files_id: ID})
    return true
  } catch (error) {
    return error;
  }
}

module.exports = {
  Query:{
    IC_Track,
    IC_Track_count
  },

  Mutation:{
    IC_Track_update,
    IC_Track_delete
  }
}