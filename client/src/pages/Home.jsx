import { Grid, Container, TextField, Paper, Stack, InputAdornment, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'
import { Posts, Form, Pagination, SearchTags } from '../components'
import { SearchPost } from '../actions/posts'
import { useLocation, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
const Home = () => {
  const [currentId, setCurrentId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchTags, setSearchTags] = useState([])
  const theme = useTheme()
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const query = new URLSearchParams(location.search)
  const page = parseInt(query.get('page') || '1', 6)
  
  const searchHandler = (e)=>{
    e.preventDefault();
    if(searchTerm || searchTags){
      dispatch(SearchPost(searchTerm, searchTags.map((tag)=>tag.title).join(',')))
      setSearchTerm('')
      setSearchTags([])
      navigate(`/search?searchPost=${searchTerm}&tags=${searchTags.map((tag)=>tag.title).join(',')}`)
    }else {
      navigate('/')
    }
  }
  
  return (
      <Container>
        <Grid container spacing={8} sx={{[theme.breakpoints.down('sm')]: {display:'flex', flexDirection:'column-reverse'}}}>
          <Grid item xs={12} sm={8} mt={2}><Posts setCurrentId={setCurrentId}/></Grid>
          <Grid item xs={12} sm={4} mt={2} >
            <Paper elevation={2}>
              <Stack spacing={1}>
                <TextField  type='text' size='small' variant='outlined'  fullWidth label='Search' InputProps={{endAdornment:<InputAdornment position='end'><SearchIcon /></InputAdornment>}} value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
                <SearchTags searchTags={searchTags} setSearchTags={setSearchTags}/>
                <Button variant='contained' color='primary' size='small' fullWidth onClick={searchHandler}>Search Post</Button>
              </Stack>
            </Paper>
            <Form setCurrentId={setCurrentId} currentId={currentId} />
            {!searchTerm && <Pagination page={page}/>}
          </Grid>
        </Grid>
      </Container>
  )
}

export default Home