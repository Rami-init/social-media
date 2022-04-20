import { useState, useEffect } from 'react'
import {AppBar, Toolbar, Button, Avatar, Box, Container } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode' 

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const location = useLocation()
  const dispatch = useDispatch()
  const handleLogOut = ()=>{
    dispatch({type: 'LOGOUT'})
    setUser(null)
  }
  useEffect(()=>{
    const token = user?.token
    if(token) {
      const decodeToken = decode(token)
      if(decodeToken.exp * 1000 < new Date().getTime()) handleLogOut()
    }
    setUser(JSON.parse(localStorage.getItem('profile')))
  },[location])
  return (
    <AppBar position='static'>
        <Toolbar>
            <Container>
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Button size='small' variant='Link'> <Link to='/' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Memories &nbsp; <EditIcon fontSize='small'/> </Link> </Button>
                    <Box>
                    {!user ? (
                      <Button size='small' variant='contained' color='secondary'> <Link to='/Auth'> Sign In </Link> </Button>
                    ) : (
                      <Box justifyContent='center' display='flex' alignItems='center' gap={3}>
                        <Avatar size='small' alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                        <Button size='small' variant='Link'><Link to={`/uesr/${user?.result?.googleId}`}>{ user?.result?.name}</Link></Button>
                        <Button variant='contained' size='small' color='error' onClick={handleLogOut}> Log out</Button>
                      </Box>
                    )}
                    </Box>
                </Box>
            </Container>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar