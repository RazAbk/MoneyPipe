require('dotenv').config()

import express from 'express'
import { IData } from './interfaces/dataInterfaces';
import { IUser } from './interfaces/userInterfaces';
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const { Logger } = require('./logger');

declare global {
  namespace Express {
    interface Request {
      user: IUser,
      data: IData
    }
  }
}

const app = express();

app.use(express.json())
app.use(cookieParser())

if (process.env.NODE_ENV === 'production') {
  // Express serves static files on production environment
  app.use(express.static(path.resolve(__dirname, 'public')))
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
  res.status(200).send(path.join(__dirname, 'public', 'index.html'))
})

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  Logger.info(`Server is running on port ${PORT}.`);
});