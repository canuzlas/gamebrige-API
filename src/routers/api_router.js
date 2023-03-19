const express = require('express')
const router = express.Router()
const apiController = require('../controllers/api_controller')
const apiMdw = require("../mdw/api_mdw")

router.get('/:appId', apiMdw.checkCustomer, apiController.getApiJwt)

router.post('/checkemail', apiMdw.checkCustomer, apiController.checkEmail)
router.post('/checkusername', apiMdw.checkCustomer, apiController.checkUserName)

router.post('/register', apiMdw.checkCustomer, apiController.register)
router.post('/login', apiMdw.checkCustomer, apiController.login)
router.post('/loginwithgoogle', apiMdw.checkCustomer, apiController.loginwithgoogle)


router.post('/getfollowedsblogs',apiMdw.checkCustomer,apiMdw.checkToken, apiController.getFollowedsBlogs)
router.post('/getblog',apiMdw.checkCustomer,apiMdw.checkToken, apiController.getoneblog)
router.post('/getallblogs',apiMdw.checkCustomer,apiMdw.checkToken, apiController.getallblogs)

router.post('/getalluserfromarray',apiMdw.checkCustomer, apiController.getalluserfromarray)
router.post('/getmessagingpersondata',apiMdw.checkCustomer, apiController.getmessagingpersondata)


router.post('/searchperson',apiMdw.checkCustomer,apiMdw.checkToken, apiController.searchperson)

router.post('/getbestusers',apiMdw.checkCustomer,apiMdw.checkToken, apiController.searchbestperson)
router.post('/getpersondata',apiMdw.checkCustomer,apiMdw.checkToken, apiController.getpersondata)


router.post('/saveblog',apiMdw.checkCustomer,apiMdw.checkToken, apiController.saveBlog)

router.post('/getmyblogs',apiMdw.checkCustomer,apiMdw.checkToken, apiController.getmyblogs)
router.post('/getoneblog',apiMdw.checkCustomer,apiMdw.checkToken, apiController.getoneblog)

router.post('/deleteblog',apiMdw.checkCustomer,apiMdw.checkToken, apiController.deleteblog)
router.post('/editblog',apiMdw.checkCustomer,apiMdw.checkToken, apiController.editblog)


router.post('/followperson',apiMdw.checkCustomer,apiMdw.checkToken, apiController.followperson)

router.post('/report/:towhat',apiMdw.checkCustomer,apiMdw.checkToken, apiController.reportSystem)


router.post('/updateprofile',apiMdw.checkCustomer,apiMdw.checkToken, apiController.updateprofile)
router.post('/changepp',apiMdw.checkCustomer,apiMdw.checkToken, apiController.changepp)






module.exports = router