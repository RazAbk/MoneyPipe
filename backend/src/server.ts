require('dotenv').config()

import express from 'express'
const cors = require('cors')
// const path = require('path')
const cookieParser = require('cookie-parser')

// Todo: change from any to user
declare global {
  namespace Express {
    interface Request {
      user: any
    }
  }
}

const app = express();

app.use(express.json())
app.use(cookieParser())

if (process.env.NODE_ENV === 'production') {
  // Express serves static files on production environment
  // app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  // Configuring CORS
  // Express serves static files on dev environment
  const corsOptions = {
      origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000', 'http://10.100.102.21:3000/'],
      methods: ['GET', 'POST', 'DELETE', 'PUT'],
      credentials: true
  }
  app.use(cors(corsOptions))
}

const userRoutes = require('./api/user/user.routes')
const authRoutes = require('./api/auth/auth.routes')


// Routes

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.get('/**', (req, res) => {
  res.status(200).send('hello!')
})

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});