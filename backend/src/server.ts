import express from 'express';

const app = express();
const PORT = 3030;

app.get('/', (req, res) => {
    res.status(200).send('hello!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});