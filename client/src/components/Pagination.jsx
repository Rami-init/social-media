import { Link } from 'react-router-dom'
import { Pagination, PaginationItem, Paper } from '@mui/material'
import { styled }  from '@mui/material/styles'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../actions/posts'
const Paginate = ({ page }) => {
  const {totalPages} = useSelector((state)=>state.posts)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getPosts(page))
  },[page])
  const PaginateUl = styled('div')({
    '& .MuiPagination-ul':{
      display: 'flex',
      justifyContent: 'space-around',
      margin: '0.3rem 0 2rem'
    }
  })
  return (
    <Paper elevation={4} >
      <PaginateUl>
        <Pagination
          count={totalPages}
          page={page}
          variant="outlined"
          color="primary"
          renderItem={(item)=>(
              <PaginationItem {...item} component={Link} to={`posts?page=${item.page}`}  />
          )}
          />
      </PaginateUl>
    </Paper>
  )
}

export default Paginate