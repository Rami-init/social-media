const Users = require('../models/users')
const handleAsync = require('../middleware/handleAsync')
const ErrorResponse = require('../utils/ErrorResponse')

exports.SignIn = handleAsync(async (req, res, next)=>{
    const {email, password} = req.body
    if(!email || !password) return next(new ErrorResponse('Please enter the valid password and email', 404))
    const user = await Users.findOne({email}).select('+password')
    if(!user) return next(new ErrorResponse('invalid credentials email and password', 401))
    const isMatch = await user.matchPasswords(password)
    if(!isMatch) return next(new ErrorResponse('please enter the valid password', 401))
    
    const token = await user.getSignToken()
    if(!token) return next(new ErrorResponse('the token have been interapte please sign again', 401))
    sendRequest(res, 200, user, token)

})
exports.SignUp = handleAsync(async (req, res, next)=>{
    const {email, password, firstName, lastName, confirmPassword} = req.body
    if(password !== confirmPassword) return next(new ErrorResponse('the password is not match', 401))
    const name = `${firstName} ${lastName}`
    const user = await Users.create({name, password, email})
    if(!user) return next(new ErrorResponse('invalid credentials email and password', 401))
    const token = await user.getSignToken()
    if(!token) return next(new ErrorResponse('the token have been interapte please sign again', 401))
    sendRequest(res, 201, user, token)

})

const sendRequest = (res, code, result, token)=> res.status(code).json({seccess: true, data: {result, token}})