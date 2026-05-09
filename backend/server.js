import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import 'dotenv/config';
import enterpriseRoutes from './routes/enterpriseRoutes.js';
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

// app cpnfi
const app = express();
app.set('trust proxy', 1); 
const port = process.env.PORT || 10000;

// middlewares
app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN, 
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json({ limit: '5mb' }));


const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    throw new Error('MONGO_URI is not configured');
}

app.use(
    session({
        name: 'bepro.sid',
        secret: process.env.SESSION_SECRET || 'dev-session-secret',
        resave: false,
        saveUninitialized: false,
        proxy: true, 
        cookie: {
            httpOnly: true,
         
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', 
            secure: process.env.NODE_ENV === 'production', // На Render ДОЛЖНО быть true
            maxAge: 1000 * 60 * 60 * 24 * 7,
        },
        store: MongoStore.create({
            mongoUrl: mongoUri,
            collectionName: 'sessions',
        }),
    })
);

//api endpoints
app.get('/',(req,res) => {
    res.send('API WORKING...');
});

app.use('/api/auth', authRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/enterprise', enterpriseRoutes);
app.use('/api/reviews', reviewRoutes);


app.listen(port, '0.0.0.0', () => console.log(`Server is running on port `));


mongoose
    .connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => {
        console.error('MongoDB connection failed:', error.message);
    });
