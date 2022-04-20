import { CardMedia, Card, Typography, CardContent, Stack, ButtonBase } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const RecommendedPost = ({post}) => {
  const navigate = useNavigate()
  return (
    <Card maxHeigth='340px' width='250px'>
        <ButtonBase component="span" onClick={()=>navigate(`/posts/${post?._id}`)} sx={{display: 'flex', flexDirection: 'column'}} >
            <CardMedia>
                <img src={post?.selectFile} style={{width: '100%', height: '8rem'}} alt="post" />
            </CardMedia>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant='caption' color='disabled' fontWeight='600'>{post?.tags.map((tag)=>`#${tag}`).join(',')}</Typography>
                    <Typography variant='body1' fontWeight='600'>{post?.title}</Typography>
                    <Typography variant='body2' >{post?.message}</Typography>
                </Stack>
            </CardContent>
        </ButtonBase>
    </Card>
  )
}

export default RecommendedPost