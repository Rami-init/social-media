const express = require('express')
require('dotenv').config({path: './config.env'})
const cors = require('cors')
const connectDB = require('./config/db')

const app = express()
connectDB()

app.use(cors())
app.use(express.json())

app.get('/', (req, res)=> res.send('this is build success'))
app.use('/api/posts', require('./routes/posts'))
app.use('/api/users', require('./routes/users'))

app.use(require('./middleware/handleError'))

const PORT =process.env.PORT || 5000
app.listen(PORT, ()=>console.log(`The Server is running in ${PORT}`))
