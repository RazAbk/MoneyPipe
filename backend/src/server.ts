import express from 'express';
const cors = require('cors')
const path = require('path')

const app = express();

app.use(express.json())

if (process.env.NODE_ENV === 'production') {
  // Express serves static files on production environment
  // app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  // Configuring CORS
  // Express serves static files on dev environment
  const corsOptions = {
      origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
      credentials: true
  }
  app.use(cors(corsOptions))
}

const userRoutes = require('./api/user/user.routes')


// Routes

app.use('/api/user', userRoutes)

app.get('/**', (req, res) => {
  res.status(200).send('hello!')
})

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});