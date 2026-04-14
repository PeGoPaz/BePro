import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';

// app cpnfig
const app = express();
const port = process.env.PORT || 9000;
connectDB();

// middlewares
app.use(cors());
app.use(express.json());

//api endpoints
app.get('/',(req,res) => {
    response.send('API WORKING...');
});

app.listen(port, () => console.log(`Listening on localhost:${port}`));