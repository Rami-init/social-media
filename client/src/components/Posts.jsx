import React from 'react'
import { useSelector } from 'react-redux'
import { CircularProgress, Grid } from '@mui/material'
import Post from './Post'

const Posts = ({ setCurrentId }) => {
  const {posts, loading} = useSelector((state) => state.posts);
  if (!posts && !loading) return 'No posts';
  return (
    loading ? <CircularProgress mt={20} mb={15}/> : (
      <Grid container spacing={4} mb={1} alignItems='stretch'>
         {posts?.map((post)=>(
           <Grid item xs={12} key={post._id} sm={6} md={4}>
             <Post post={post} setCurrentId={setCurrentId} /> 
           </Grid> 
         ))}
      </Grid>
    )
  )
}

export default Posts