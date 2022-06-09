import { useState, useRef } from 'react'
import { styled } from '@mui/material/styles'
import {Grid, Typography, TextField, Button, Box, Paper} from '@mui/material'
import { useDispatch } from 'react-redux'
import { commentPost } from '../actions/posts'
const CommentSection = ({post}) => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState(post?.comments)
    const commentRef = useRef(null)
    const handleComment = async()=>{
        const newcomment = {name: user?.result?.name, text: comment}
        setComments([...post?.comments, newcomment])
        const temp = dispatch(commentPost(post._id, newcomment))
        setComments(temp)
        setComment('')
        console.log(commentRef.current.scrollHeight = 0)
    }
    const CommentWrapper = styled('div')(({theme})=>({
        diplay: 'flex',
        flexDirection: 'column',
        justifyContent:  'center',
        alignItems: 'center',
        overflowY: 'scroll',
        maxHeight: '8rem',
        backgroundColor: theme.palette.common
    }))
    const commentBox = {
        display: 'flex',
        justifyContent: 'start',
        alginItems: 'center',
        gap: '1rem',
        paddingY: '8px',
        paddingLeft: '16px',
    }
  return (
    <Grid container spacing={3}> 
        <Grid item xs={12} md={6} sx={{display: 'flex', flexDirection: 'column'}}>
            <Typography variant='h6' fontWeight='600'>Comments</Typography>
            <CommentWrapper>
                {comments?.map((com, index)=>(
                    <Paper sx={commentBox} key={index}>
                        <Typography variant='body2' color='primary' fontWeight='800'>{com?.name}</Typography>
                        <Typography variant='body2'>{com.text}</Typography>
                    </Paper>
                ))}
                <div ref={commentRef}></div>
            </CommentWrapper>
        </Grid>
        {user && <Grid item xs={12} md={6} sx={{display: 'flex', flexDirection: 'column'}}>
        <TextField  type='text' name='comment' fullWidth value={comment} multiline rows={4}  onChange={(e)=> setComment(e.target.value)} variant='outlined' label='Write a Comment...' />
        <Button color='primary' disabled={!comment} variant='contained' fullWidth sx={{marginTop: 2 }} onClick={handleComment}> send comment </Button>
        </Grid> }
    </Grid>
  )
}

export default CommentSection