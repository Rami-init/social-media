import React, { useEffect, useState } from 'react'
import { Box, Typography, Container, Stack, Paper, Divider, Grid, TextField, Button, CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPostDetails, SearchPost, commentPost } from '../actions/posts'
import { styled } from '@mui/material/styles'
import { RecommendedPost, CommentSection } from '../components'
import momnet from 'moment'


const PostDetails = () => {
  const dispatch = useDispatch()
  const {post, posts,loading} = useSelector((state)=>state.posts)
  const {id} = useParams()
  const user = JSON.parse(localStorage.getItem('profile'))
  const userId = user?.result?.googleId || user?.result._id
  useEffect(()=>{
    dispatch(getPostDetails(id))
  },[id])
  useEffect(()=>{
    if(post) {
      dispatch(SearchPost('none', post?.tags.join(',')))
    }
  },[post])
  
  if (!post) return null;
  const recommendedPosts = posts?.filter(({ _id }) => _id !== post?._id);

  const PostWrapper = styled('div')(({theme})=>({
    padding:'3rem 0',
    '& .MuiTypography-h4': {
      marginTop: '2rem',
      textTransform: 'uppercase',
      fontStyle: 'italic'
    },
    '& .MuiGrid-container':{
      [theme.breakpoints.down('md')]:{
        display: 'flex',
        flexDirection: 'column-reverse'
      },
    },
    '& .MuiTypography-body2': {
      color: theme.palette.grey[500]
    },
    '& .MuiTypography-body1': {
      color: theme.palette.grey[800]
    },
    '& .MuiPaper': {
      borderRedius: '2rem',
    }
  }))
  
  return (
    <PostWrapper>
        <Container maxWidth='xl'>
          {loading?<CircularProgress width={3} /> :<Paper elevation={6} >
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box sx={{padding: '1rem 3rem'}}>
                  <Stack spacing={1}>
                    <Typography variant='h4' fontWeight='600' mt={4}>{post?.title}</Typography>
                    <Typography variant='body1' fontWeight='600' gutterBottom>{post?.tags.map((tag)=>` #${tag}`).join(', ')}</Typography>
                    <Box>
                    <Typography variant='body2' gutterBottom mt={3} mb={1}>{post?.message}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', gap: 5}}>
                      <Typography variant='body1' fontWeight='600'>{post?.name}</Typography>
                      <Typography variant='body2' component='span' fontWeight='600'>{momnet(post?.createdAt).startOf('ss').fromNow()}</Typography>
                    </Box>
                    <Divider></Divider>
                  
                    
                  </Stack>
                  <Box mt={3}>
                    <CommentSection post={post} />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} sx={{ overflow:'hidden'}}>
                  <img src={post?.selectFile} alt='image details' style={{width: '100%', height: '27rem'}} />
              </Grid>
            </Grid>
            <Box sx={{padding: '1rem 3rem'}}>
              <Divider></Divider>
              <Typography variant='h6' fontWeight='600' mt={4} mb={2}>You Might Also Like:</Typography>
              <Grid container spacing={2}>
                {recommendedPosts.map((item)=>(
                  <Grid item xs={6} md={4} lg={2} key={item?._id}>
                    <RecommendedPost post={item}/>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>}
        </Container>
    </PostWrapper>
  )
}

export default PostDetails