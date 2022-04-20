import * as api from '../api/index.js'
import * as Constant from '../constant/actionTypes'

export const getPosts = (page)=> async(dispatch)=>{
    try {
        dispatch({type: Constant.START_LOADING})
        const {data: { data, currentPage, totalPages }} = await api.fetchPosts(page)
        dispatch({type: Constant.FETCH_ALL, payload: {data, currentPage, totalPages}})
        dispatch({type: Constant.END_LOADING})
    } catch (error) {
        console.log(error)
    }
}
export const getPostDetails = (id)=> async(dispatch)=>{
    try {
        dispatch({type: Constant.START_LOADING})
        const {data: { data }} = await api.fetchPostDetails(id)
        dispatch({type: Constant.FETCH_POST_DETAILS, payload: data})
        dispatch({type: Constant.END_LOADING})
    } catch (error) {
        console.log(error)
    }
}
export const createPost = (post)=> async (dispatch)=>{
    try{
        const {data: {data}} = await api.createPost(post)
        dispatch({type: Constant.CREATE, payload: data})
    } catch (error) {
        console.log(error)
    }
}
export const updatePost = (id, post)=> async (dispatch)=>{
    try{
        const {data: { data }} = await api.updataPost(id, post)
        dispatch({type: Constant.UPDATE, payload: data})
    } catch (error) {
        console.log(error);
    }
}
export const deletePost = (id)=> async (dispatch)=>{
    try{
        await api.deletePost(id)
        dispatch({type: Constant.DELETE, payload: id})
    } catch (error){
        console.log(error)
    }
}
export const likePost = (id)=> async (dispatch)=>{
    try {
        const {data: { data }} = await api.likePost(id)
        dispatch({type: Constant.LIKEPOST, payload: data})
    } catch (error) {
        console.log(error)
    }
}
export const SearchPost = (searchTerm, tags)=> async(dispatch)=>{
    try{
        dispatch({type: Constant.START_LOADING})
        const { data: { data }} = await api.fetchSearchPosts(searchTerm, tags) 
        dispatch({type: Constant.FETCH_DATA, payload: data})
        dispatch({type: Constant.END_LOADING})

    } catch(error){
        console.log(error)
    }
}
export const commentPost = (id, comment)=> async (dispatch)=>{
    try{
        const { data: { data }} = await api.commentPost(id, comment)
        dispatch({type: Constant.COMMENT, payload: data})
        return data.comments
    } catch (error){
        console.log(error)
    }
}