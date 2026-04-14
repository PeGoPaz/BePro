import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import enterpriseRoutes from './routes/enterpriseRoutes.js';

// app cpnfig
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(cors());
app.use(express.json());

//api endpoints
app.get('/',(req,res) => {
    res.send('API WORKING...');
});

app.use('/api/enterprise', enterpriseRoutes);

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    throw new Error('MONGO_URI is not configured');
}

mongoose
    .connect(mongoUri)
    .then(() => {
        app.listen(port, () => console.log(`Listening on localhost:${port}`));
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    });
