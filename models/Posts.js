const mongoose = require('mongoose')

const PostsSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide the title']
    },
    message: {
        type: String,
        required: [true, 'Please provide the message']
    },
    careator: {
        type: String,
        required: [true, 'Please provide the careator']
    },
    comments: {
        type: [Object],
    },
    name: {
        type: String,
        required: [true, 'Please provide the careator']
    },
    selectFile: {
        type: String,
        required: [true, 'Please provide the selectFile']
    },
    tags: {
        type:[String],
        required: [true, 'Please provide the tags']
    },
    likes: {
        type: [String],
        default: []
    },
},{
    timestamps: true
})

const Posts = mongoose.model('Posts', PostsSchema)


module.exports = Posts