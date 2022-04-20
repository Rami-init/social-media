const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
// const hashC = require('crypto').randomBytes(23).toString('base64')
// console.log(hashC)
const usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide the name']
    },
    password: {
        type: String,
        minlength: 3,
        select: false,
        required: [true, 'please provide the password']
    },
    email: {
        type: String,
        required: [true, 'please provide the email'],
        unique: true,
        match: [ /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        , 'Please provide valid Email'],
    },
},{
    timestamps: true
})
usersSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
usersSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password)
}
usersSchema.methods.getSignToken = async function () {
    return await jwt.sign({id: this._id, email: this.email}, process.env.JWT_SECRET, {expiresIn: '1d'})
}

const Users = mongoose.model('Users', usersSchema)

module.exports = Users