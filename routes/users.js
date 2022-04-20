const express = require('express')
const router = express.Router()

const  {SignIn, SignUp} = require('../controllers/users')

router.route('/login').post(SignIn)
router.route('/register').post(SignUp)

module.exports = router