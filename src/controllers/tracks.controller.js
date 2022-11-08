const multer = require('multer')
const { connectDB }  = require('../db')
const { GridFSBucket, ObjectId } = require('mongodb')
const { Readable } = require('stream') //convert a buffer to a string


const getTrack =  (req, res)=>{
  let id

  try {
    id = new ObjectId(req.params.ID)
  } catch (error) {
    return res.status(400).json({message: 'invalid track in your url'})
  } // check if the id exists in the database

  res.set('content-type', 'audio/mp3')//  returns a document type as specified
  res.set('accept-ranges', 'bytes')

  const db = connectDB()
  const bucket = new GridFSBucket(db, {
    bucketName:'tracks'
  })

  let downloadStream = bucket.openDownloadStream(id) // search for audio by id -> return a string

  downloadStream.on('data', chunk =>{
    //when it listens to the request, it will send the client each piece that is arriving
    res.write(chunk)
  })
  downloadStream.on('error', ()=>{
    res.sendStatus(404)
  })//if there is an error ends with the warning 
  downloadStream.on('end', ()=>{
    res.end()
  })//if it ends correctly
}


//to upload the file
const uploadTrack = (req, res)=>{
  //config as buffer -> save the file and keep it in memory
  const storage = multer.memoryStorage()
  const upload = multer({
    storage,
    //to give you upload settings
    limits: {
      //Apart from the file, what fields am I going to send in this case the name -> 1 more field
      fields:1,
      //the size of the file that you will receive in megabytes 1 mega is equal to 1 million
      fieldSize: 6000000,
      //How many files am I uploading at the same time
      files:1,
      //the fields that I am going to upload in this case are the file and the name of the song
      //parts:2 -> if I put this it does not recognize the upload because it has multiple parts
    }
  })

  //execute it - single allows to listen when a file is uploaded and in () the name of the variable that the file will have
  //it can be given configurations since it is a middleware
  upload.single('track')(req,res,(err)=>{
    if (err) {
      console.log(err);
      return res.status(400).json({message: err.message})

      //name is the name of the song
    }else if(!req.body.name){
      return res.status(400).json({message: 'No track name in request body'})
    }

    let trackName = req.body.name

    const readableTrackString =  new Readable()
    readableTrackString.push(req.file.buffer)//req.file.buffer is the audio
    readableTrackString.push(null)//this ends the conversion

    //already having the file and the name we are going to save it in the database
    const db = connectDB() // connection to the bd

    //let's call the gridFs
    //parameters the connection to the database and its name
    const bucket = new GridFSBucket(db, {
      bucketName: 'tracks'
    }) // it's like giving the name of the collection the name of the audio container

    //upload file via bucket
    const uploadStream = bucket.openUploadStream(trackName);
    const id = uploadStream.ID
    readableTrackString.pipe(uploadStream)//this is so that as you get the string you pass it to mongo db
    //send the audio and also the name

    //to check for errors
    uploadStream.on('error', ()=>{
      return res.status(500).json({message: 'Error uploading your file'})
    })

    //finish uploading file successfully
    uploadStream.on('finish', ()=>{
      return res.status(201).json({message:'File uploaded successfully ID: ' + id})
    })
  })  
}

module.exports = {
  getTrack,
  uploadTrack
}