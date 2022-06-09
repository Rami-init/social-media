import axios from 'axios'


const API = axios.create({baseURL: `${process.env.REACT_APP_BACKEND_PORT}/api`})

API.interceptors.request.use((req)=> {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})
export const fetchPosts = (page)=> API.get(`/posts?page=${page}`)
export const fetchPostDetails = (id)=> API.get(`/posts/${id}`)

export const fetchSearchPosts = (SearchTerm, tags)=> API.get(`/posts/search?searchPost=${SearchTerm}&tags=${tags}`)
export const createPost = (post)=> API.post('/posts', post)
export const updataPost = (id, post)=> API.put(`/posts/${id}`, post)
export const deletePost = (id)=> API.delete(`/posts/${id}`)
export const likePost = (id)=> API.patch(`/posts/${id}/likePost`)
export const commentPost = (id, comment)=> API.post(`/posts/${id}/comment`, comment)

export const signIn = (data)=> API.post(`/users/login`, data)
export const signUp = (data)=> API.post(`/users/register`, data)