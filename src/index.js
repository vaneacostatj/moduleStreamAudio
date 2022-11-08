const express = require('express');
const config = require('./config');
const morgan = require('morgan')
const cors = require('cors')
//const { connectDB } = require('./db');
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
app.listen(config.port, ()=> {
  console.log(`server on port ${config.port}`) 
})