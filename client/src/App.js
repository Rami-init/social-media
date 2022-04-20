import { useTheme } from '@mui/material/styles'
import { Navbar, Footer } from './components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import PostDetails from './pages/PostDetails'

const App = () => {
  const theme = useTheme()
  return (
    <Router>
      <div style={{height: '100vh', backgroundColor: theme.palette.grey[100]}}>
        <Navbar />
          <Routes>
            <Route path='/*' element={<Home />} />
            <Route path='/posts/:id' element={<PostDetails />} />
            <Route path='/auth' element={<Auth />} />
          </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App