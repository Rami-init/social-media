import React, { useState, useEffect } from 'react'
import { Paper, Avatar, Container, Typography, Grid, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import { G_icon } from '../assets/g-icon'
import { Input } from '../components'
import { signUp, signIn } from '../actions/auth'
const Auth = () => {
  const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const handlePassword = ()=> setShowPassword((prevShowPassword)=> !prevShowPassword)
  
  useEffect(()=>{
    if(JSON.parse(localStorage.getItem('profile'))) {
        location.pathname = '/'
      }
  },[location])
  
    const handleSubmit = (e)=> {
        e.preventDefault()
        if(isSignUp) {
            dispatch(signUp(formData, navigate))
        } else {
            dispatch(signIn(formData, navigate))
        }
    }
    const handleChange = (e)=> {
      setFormData({...formData, [e.target.name]: e.target.value}) 
    }
    const googleSuccess = async (res)=>{
        const result = res?.profileObj
        const token = res?.tokenId
        try {
            dispatch({type: 'AUTH', payload: { result, token}})
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    const googleFail = ()=>{
        
        console.log('the cred is not valid')
    }
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:`calc(100vh - 112px)`, [theme.breakpoints.down('md')]:{width: '100%', padding: '0 1rem'}}}>
        <Paper elevation={3} sx={{ [theme.breakpoints.down('sm')]:{width: '100%'}, [theme.breakpoints.up('sm')]:{width: '60%'}, [theme.breakpoints.up('md')]:{width: '34%'}, borderRadius: '1rem' , postion: 'relative', padding: '.4rem 2rem' }}>
            <Avatar sx={{ top: '-18px', left: '45%' }}> <LockOutlinedIcon color='error' /> </Avatar>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant='h5' fontWeight='600' mb={3}>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <Grid container spacing={2}>
                    {isSignUp && <Input name='firstName' type='text' label='First Name' autoFoucs handleChange={handleChange} xs={6}/>}
                    {isSignUp && <Input name='lastName' type='text' label='Last Name'  handleChange={handleChange} xs={6}/>}
                    <Input name='email' type='email' label='E-mail'  handleChange={handleChange} xs={12}/>
                    <Input name='password' type={showPassword ? 'text' : 'password'} label='Password' autoFoucs handleChange={handleChange} handlePassword={handlePassword} xs={12}/>
                    {isSignUp && <Input name='confirmPassword' type='password' label='Confirm Password'  handleChange={handleChange}  xs={12}/>}
                    <Grid item xs={12}>
                        <Button variant='contained' fullWidth type='submit' color='primary'>{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <GoogleLogin 
                            clientId={process.env.REACT_APP_GOOGLE_API}
                            render={(renderProps)=>(
                                <Button variant='contained' startIcon={<G_icon />} fullWidth color='secondary'  onClick={renderProps.onClick} disabled={renderProps.disabled}>  &nbsp; Google Sign In</Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFail}
                            cookiePolicy={'single_host_origin'}
                        />
                    </Grid>
                    <Grid item xs={12} justifyContent='flex-end'>
                        <Button fullWidth onClick={()=>setIsSignUp((prevSign)=>!prevSign)}>{isSignUp ? 'I have aleardy an acount? Sign In' : "i Don't have an acount? sign Up" }</Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth