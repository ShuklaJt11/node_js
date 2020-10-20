require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')

const playlistsRoutes = require('./routes/playlists')
const userRoutes = require('./routes/user')

const PORT = process.env.PORT
const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/playlists', playlistsRoutes)
app.use('/api/user', userRoutes)
 
app.use((req, routes, next) => {
  const error = new Error('Endpoint not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`)
})