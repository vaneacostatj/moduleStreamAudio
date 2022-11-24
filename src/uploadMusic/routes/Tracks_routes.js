const {Router} = require('express')
const {getTrack, uploadTrack} = require('../controllers/tracks.controller')

const router = Router()

router.get('/tracks/:ID', getTrack )

router.post('/tracks', uploadTrack )

module.exports = router