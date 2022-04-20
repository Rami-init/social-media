const Posts = require('../models/Posts')
const handleAsync = require('../middleware/handleAsync')
const ErrorResponse = require('../utils/ErrorResponse')

exports.getPosts = handleAsync(async(req, res, next)=>{
    const { page } = req.query
    const limit = req.query.limit || 6;
    const startIndex = (Number(page) -1) * limit
    const total = await Posts.countDocuments({})
    const posts = await Posts.find().sort({_id: -1}).limit(limit).skip(startIndex)
    res.status(200).json({data:posts, totalPages: Math.ceil(total / limit), currentPage: Number(page) })
})
exports.CreatePost = handleAsync(async(req, res, next)=>{
    const data = await req.body
    const post = await Posts.create({...data, careator: req.userId})
    console.log(post)
    sendReqest(res, 201, post)
})
exports.updatePost = handleAsync(async(req, res, next)=>{
    const { id } = req.params
    let post = await Posts.findById(id)
    if(!post) return sendReqest(res, 404, 'No post found with this id', false)
    post = await Posts.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
    sendReqest(res, 201, post)
})
exports.getPost = handleAsync(async(req, res, next)=>{
    const { id } = req.params
    let post = await Posts.findById(id)
    if(!post) return sendReqest(res, 404, 'No post found with this id', false)
    sendReqest(res, 201, post)
})
exports.deletePost = handleAsync(async(req, res, next)=>{
    const { id } = req.params
    let post = await Posts.findById(id)
    if(!post) return sendReqest(res, 404, 'No post found with this id', false)
    await post.remove()
    sendReqest(res, 200, 'the post deleted successfuly')
})
exports.likePost = handleAsync(async(req, res, next)=>{
    const { id } = req.params
    if(!req?.userId) return next(ErrorResponse('Not authorized to access this route', 401))
    let post = await Posts.findById(id)
    if(!post) return sendReqest(res, 404, 'No post found with this id', false)
    const index = post?.likes?.findIndex((ix)=> ix === String(req.userId))
    if(index === -1) {
        post?.likes.push(req?.userId)
    } else {
        post.likes = post?.likes.filter((ix)=> ix !== String(req?.userId))
    }
    const like = await Posts.findByIdAndUpdate(id, post, {new: true, runValidators: true})
    sendReqest(res, 201, like)
})
exports.searchPosts = handleAsync(async(req, res, next)=>{
    const {searchPost, tags} = req.query
    const title = new RegExp(searchPost, 'i')
    const posts = await Posts.find({$or:[{title}, {tags: {$in: tags.split(',')}}]})
    sendReqest(res, 200, posts)
})
exports.commentPost = handleAsync(async(req, res, next)=>{
    const {id} = req.params
    let post = await Posts.findById(id)
    if(!post) {
        return next(new ErrorResponse('there is no post with this id'))
    }
    await post.comments.push(req.body)
    const newPost = await Posts.findByIdAndUpdate(id, post, {new: true , runValidators: true})
    sendReqest(res, 201, newPost)
})
const sendReqest = (res, code, data, success=true)=> res.status(code).json({
    success: success,
    data
})