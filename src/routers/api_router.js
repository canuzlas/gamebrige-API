const express = require('express')
const router = express.Router()
const apiController = require('../controllers/api_controller')
const apiMdw = require("../mdw/api_mdw")

router.get('/:appId', apiMdw.checkCustomer, apiController.getApiJwt)
router.post('/', apiMdw.checkCustomer, apiController.postApiJwt)
router.post('/checkemail', apiMdw.checkCustomer, apiController.checkEmail)


router.post('/registerorlogin', apiMdw.checkCustomer, apiController.registerOrLogin)

router.post('/saveblog',apiMdw.checkCustomer, apiController.saveBlog)

router.post('/getmyblogs',apiMdw.checkCustomer, apiController.getmyblogs)
router.post('/getoneblog',apiMdw.checkCustomer, apiController.getoneblog)

router.post('/deleteblog',apiMdw.checkCustomer, apiController.deleteblog)
router.post('/editblog',apiMdw.checkCustomer, apiController.editblog)

router.post('/searchperson',apiMdw.checkCustomer, apiController.searchperson)

router.post('/followperson',apiMdw.checkCustomer, apiController.followperson)

module.exports = router