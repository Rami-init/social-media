import * as constant from '../constant/actionTypes'

const posts = (state={loading:false, posts:[], post:[]}, action)=>{
    switch (action.type) {
        case constant.START_LOADING:
            return {...state, loading: true}
        case constant.END_LOADING:
            return {...state, loading: false}
        case constant.FETCH_ALL:
            return  {...state, posts: action.payload.data, currentPage: action.payload.currentPage, totalPages: action.payload.totalPages}
        case constant.FETCH_DATA:
            return  {...state, posts: action.payload}
        case constant.FETCH_POST_DETAILS:
            return  {...state, post: action.payload}
        case constant.CREATE:
            return {...state, posts: [...state.posts, action.payload]}
        case constant.COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                  if (post._id === action.payload._id) {
                    return action.payload;
                  }
                  return post
                }),
              };
        case constant.UPDATE:
            return {...state, posts: state.posts?.map((post)=>post._id === action.payload._id? action.payload: post)}
        case constant.DELETE:
            return {...state, posts: state.posts?.filter((post)=>post._id !== action.payload)}
        case constant.LIKEPOST:
            return {...state, posts: state.posts?.map((post)=>post._id === action.payload._id? action.payload: post)}
        default:
            return posts
    }
}

export default posts