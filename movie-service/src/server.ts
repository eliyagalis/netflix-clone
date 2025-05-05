// src/server.ts (updated)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import movieRoutes from './routes/movie.routes';
import genreRouter from './routes/genre.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  "http://localhost:5174",
  "http://user-service:3002",
  "https://payment-service:3003",
  "http://movie-service:3000",
  "http://streaming-service:3004",
  "*"
];

app.use(cors({origin: allowedOrigins ,credentials:true}));
app.use(express.json());

// API routes
app.use('/api/v1/movies', movieRoutes);

// Netflix-style genre browsing
app.use('/api/v1/genre', genreRouter);

app.listen(PORT, () => {
  console.log(`Movies microservice running on port ${PORT}`);
});