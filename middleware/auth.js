const jwt = require('jsonwebtoken')
const Users = require('../models/users')
const ErrorResponse = require('../utils/ErrorResponse');
const handleAsync = require('./handleAsync');

exports.auth = handleAsync(async (req, res, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1]
    }
    if(!token) return next(new ErrorResponse('Not authorized to access this route', 401))
    const isCustomAuth = token.lenght < 500
    if(!isCustomAuth) {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) return next(new ErrorResponse('Not authorized to access this route valid token', 401))
        const user = await Users.findById(decoded.id) 
        if(!user) return next(new ErrorResponse('no user found with this id', 404))
        req.userId = user?._id
    } else {
        const decoded = await jwt.decode(token)
        if(!decoded) return next(new ErrorResponse('Not authorized to access this route valid token', 401))
        req.userId = decoded?.sub
    }
    next() 
})