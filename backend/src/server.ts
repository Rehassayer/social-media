import express, {Request, Response} from 'express';

import authRoutes from './routes/authRoutes.js';


const app = express();

//API routes
app.use("/media", authRoutes);


export default app;