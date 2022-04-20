import * as constant from '../constant/actionTypes'
import * as api from '../api'
export const signIn = (user, navigate)=> async (dispatch)=>{
    try {
        const { data: { data }} = await api.signIn(user)
        console.log(data)
        dispatch({type: constant.AUTH, payload: data})
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}
export const signUp = (user, navigate)=> async (dispatch)=>{
    try {
        const { data: { data }} = await api.signUp(user)
        console.log(data)
        dispatch({type: constant.AUTH, payload: data})
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}