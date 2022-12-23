const express = require('express')
const router = express.Router()
const apiController = require('../controllers/api_controller')


router.get('/', apiController.getApiJwt)
router.post('/', apiController.postApiJwt)

router.post('/registerorlogin', apiController.registerOrLogin)

router.post('/saveblog', apiController.saveBlog)

router.post('/getmyblogs', apiController.getmyblogs)
router.post('/getoneblog', apiController.getoneblog)

router.post('/deleteblog', apiController.deleteblog)
router.post('/editblog', apiController.editblog)

router.post('/searchperson', apiController.searchperson)

router.post('/followperson', apiController.followperson)

module.exports = router