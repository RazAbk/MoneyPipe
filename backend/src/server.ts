import express from 'express'
import { IUser } from './interfaces/userInterfaces';
const expressSession = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(expressSession);
const cors = require('cors')
const path = require('path')

declare module 'express-session' {
  interface SessionData {
    user: IUser;
  }
}

const app = express();

const { configuration } = require('./config/index')

const sessionStore = new MongoDBStore({
  uri: configuration,
  collection: 'sessionStore'
})

sessionStore.on('error', function(error: any) {
  console.log(error)
})

const { getCollection } = require('./services/db.service')

const session = expressSession({
  secret: 'bla bla',
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
})

app.use(express.json())
app.use(session)

if (process.env.NODE_ENV === 'production') {
  // Express serves static files on production environment
  // app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  // Configuring CORS
  // Express serves static files on dev environment
  const corsOptions = {
      origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000', 'http://10.100.102.21:3000/'],
      methods: ['GET', 'POST'],
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