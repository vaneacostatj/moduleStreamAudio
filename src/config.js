'use strict'
require('dotenv').config()

const {startUpload} = require('./uploadMusic/index')
const {startInfoCenter} = require('./infoCenter/api')


startUpload({port: process.env.PORT_UPLOAD}).then()
startInfoCenter({port: process.env.PORT_GQL}).then()



