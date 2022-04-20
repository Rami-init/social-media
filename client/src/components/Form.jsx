import { useEffect, useState } from 'react'
import { Paper, TextField, Typography, Button, Box } from '@mui/material'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createPost, updatePost } from '../actions/posts'
import { useSelector } from 'react-redux'

const Form = ({ currentId, setCurrentId }) => {
  const post = useSelector(state => currentId ? state.posts.posts.find((p)=>p._id === currentId): null)
  const [formData, setFormData] =  useState({ title: '', message: '', tags: '', selectFile: ''}) 
  const user = JSON.parse(localStorage.getItem('profile'))
  console.log(formData.selectFile)
  const dispatch = useDispatch()
  const clear = ()=>{
    setCurrentId(null)
    setFormData({ title: '', message: '', tags: '', selectFile: ''}) 
  }
  useEffect(()=>{
    if(currentId) {
      setFormData(post)
    }
  },[post, currentId])
  const handleSubmit = (e)=>{
    e.preventDefault()
    if(currentId) {
      dispatch(updatePost(currentId, {...formData, name: user?.result?.name}))
      setCurrentId(null)
    } else {
      dispatch(createPost({...formData, name: user?.result?.name}))
    }
    clear()
  }
  if (!user?.result.name) {
    return <Paper sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2, mt: 2}} elevation={3}>
      <Typography variant='body1'>
          please sign in now to get  your own post (:
      </Typography>
    </Paper>
  }
  return (
    <Paper sx={{display: 'flex', alignItems: 'center', padding: 2, mt: 1}} elevation={3}>
        <form  onSubmit={handleSubmit} noValidate autoComplete='false'  style={{ width: '100%' ,display: 'flex', flexDirection: 'column', gap: '.5rem', alignItems: 'center', justifyContent: 'center', paddingX: '1.4rem' }}>
            <Typography variant='h6'>Create A Memory</Typography>
            <TextField variant='outlined'size='small' name='title' value={formData.title} label='title' fullWidth onChange={(e)=>setFormData({...formData, title: e.target.value})}  />
            <TextField variant='outlined' size='small' name='message' value={formData.message} multiline rows={3} label='message' fullWidth onChange={(e)=>setFormData({...formData,message: e.target.value})}  />
            <TextField variant='outlined' size='small' name='tags' value={formData.tags} label='tags' fullWidth onChange={(e)=>setFormData({...formData, tags: e.target.value.split(',')})}  />
            <Box sx={{ width: '100%'}}> <FileBase id='file' style={{ width: '100%'}} type='file' onDone={({ base64 })=> setFormData({...formData, selectFile: base64})} multiple={false} /> </Box>
            <Button variant='contained' color='primary' fullWidth type='submit'>Create</Button>
            <Button variant='contained' color='secondary' size='small' fullWidth onClick={clear}>Clear</Button>
        </form>
    </Paper>
  )
}

export default Form