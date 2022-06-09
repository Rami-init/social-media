import React from 'react'
import { CardActions, CardContent, Card, Typography, CardMedia, Button, Box, ButtonBase } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useTheme } from '@mui/material/styles'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbDownAltOutlined'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../actions/posts'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
const Post = ({ post, setCurrentId }) => {
  const dispatch= useDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  const MediaWrapper = styled('div')(({theme})=>({
    position:' absolute',
    width: '100%',
    /* height: 56.2%; */
    top: '10px',
    left: 0,
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems:' center',
    paddingLeft: '1.4rem',
    '& .MuiButton-text':{
      color: theme.palette.grey[100]
    },
    
  }))
  const openPost = ()=>navigate(`/posts/${post?._id}`)
  const user = JSON.parse(localStorage.getItem('profile'))
  const Like = ()=> {
    if(post?.likes.length > 0) {
      const likes = post.likes.find((like)=> like === (user?.result.googleId || user?.result._id))
      if(likes) {
        return <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` } </>
      } else {
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
      }
    }
    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  }
  return (
    <Card sx={{ position:'relative', borderRedais:'5rem'}}>
      <ButtonBase component="span" onClick={openPost} sx={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', textAlign: 'start'}}> 
      <CardMedia image={post?.selectFile} loading='lazy' height='128px' title={post?.title} component='img' alt='post' sx={{filter: 'brightness(0.75)', maxHeight:'120px', width:'100%' }} />
      <MediaWrapper>
        <Box>
          <Typography variant='body1' fontWeight={600} color='#fff'>{post?.name}</Typography>
          <Typography variant='body2' color='#fff'>{moment(post?.createdAt).startOf('ss').fromNow()}</Typography>
        </Box>
        {post?.careator === (user?.result.googleId || user?.result._id) && <Button size='small' onClick={(e)=>{
          e.stopPropagation();
          setCurrentId(post?._id)}}
        > <MoreVertIcon/> </Button>}
      </MediaWrapper>
      <Box width='100%' paddingX='1rem'>
        <Typography variant='body2' color={theme.palette.text.disabled}>{post?.tags.map((tag)=>` #${tag}`).join(',')}</Typography>
      </Box>
        <CardContent>
          <Typography variant='body1' fontWeight='600' mb={1} color={theme.palette.text.secondary}>{post?.title}</Typography>
          <Typography variant='body2' color={theme.palette.text.secondary}>{(post?.message).slice(0, 53)}...</Typography>
        </CardContent>
        </ButtonBase>
        <CardActions sx={{display:'flex', justifyContent:'space-between', alignItems:'center', width: '100%'}}>
          <Button size='small' color='primary' disabled={!user?.result} onClick={()=>dispatch(likePost(post?._id))}>
            <Like />
          </Button>
          {post?.careator === (user?.result.googleId || user?.result._id) && <Button size='small' color='primary'onClick={()=>dispatch(deletePost(post?._id))} >
            <DeleteIcon color='error'/>
          </Button>}
        </CardActions>
    </Card>
  )
}

export default Post