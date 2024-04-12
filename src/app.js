import api from './api/index.js';
import express from 'express';
const app = express();
import cors from 'cors';
import {notFoundHandler, errorHandler} from './middlewares.js';

app.use(cors());
app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1', api);

app.use(notFoundHandler);
app.use(errorHandler);


app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

export default app;
