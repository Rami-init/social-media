import React, { useEffect, useState } from 'react'
import { Autocomplete, TextField, Paper, Typography } from '@mui/material'
import {useSelector } from 'react-redux'

const SearchTags = ({ searchTags, setSearchTags }) => {
  const [tempTags, setTemptags]= useState([])
  let {posts, loading} = useSelector((state) => state.posts)
  useEffect(()=>{
   if(posts){
    let tags = posts?.map((post)=> post.tags)
    tags = [...new Set(tags.join().split(','))].map((item)=>Object({title: item}))
    if(tags){
      setTemptags(tags)
    }
   }
  },[posts])
  return (
    <Paper elevation={3}>
        {loading? <Typography variant='body2' algin='center' >...</Typography>: <Autocomplete
            multiple
            id='multi-tags'
            size='small'
            options={tempTags}
            getOptionLabel={(option)=>option.title}
            defaultValue={[tempTags[5]]}
            value={searchTags}
            onChange={(e, obj)=>setSearchTags(obj)}
            renderInput={(params)=>(
                <TextField
                {...params}
                variant='outlined'
                label='Search Tags'
                placeholder='Tag'
                />
            )}
        />}
    </Paper>
  )
}

export default SearchTags