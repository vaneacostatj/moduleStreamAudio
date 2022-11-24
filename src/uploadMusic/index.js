const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const tracksRoutes = require('./routes/Tracks_routes')


//initialitations
const app = express();
//connectDB(); 

//middlewares
app.use(morgan('dev'))
app.use(cors())

//routes
app.use(tracksRoutes)

//SERVER

const startUpload = async ({port})=>{
  app.listen(port, ()=> {
    console.log(`🚀🚀 server on port ${port}`) 
  })
}

module.exports ={
  startUpload
}