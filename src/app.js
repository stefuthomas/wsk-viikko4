import api from './api/index.js';
import express from 'express';
const app = express();

app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

app.use('/api/v1', api);
export default app;
