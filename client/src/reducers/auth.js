import * as constant from '../constant/actionTypes'

const auth = (state= {authData: []}, action)=>{
    switch (action.type){
        case constant.AUTH:
            localStorage.setItem('profile', JSON.stringify({...action.payload}))
            return {...state, authData: action.payload}
        case constant.LOGOUT:
            localStorage.removeItem('profile')
            return {...state, authData: null}
        default: 
            return state
    }
}
export default auth