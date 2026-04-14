import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// app cpnfig
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(cors());
app.use(express.json());

//api endpoints
app.get('/',(req,res) => {
    response.send('API WORKING...');
});