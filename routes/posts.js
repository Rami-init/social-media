const express = require('express')
const { getPosts, CreatePost, getPost, updatePost, deletePost, likePost, searchPosts, commentPost} = require('../controllers/posts')
const { auth } = require('../middleware/auth')

const router = express.Router()

router.route('/search').get(searchPosts)
router.route('/').get(getPosts).post(auth, CreatePost)
router.route('/:id').get(getPost).put(auth, updatePost).delete(auth, deletePost)
router.route('/:id/likePost').patch(auth, likePost)
router.route('/:id/comment').post( commentPost)



module.exports = router