// src/server.ts (updated)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import movieRoutes from './routes/movie.routes';
import genreRouter from './routes/genre.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({origin:"*",credentials:true}));
app.use(express.json());

// API routes
app.use('/api/v1/movies', movieRoutes);

// Netflix-style genre browsing
app.use('/api/v1/genre', genreRouter);

app.listen(PORT, () => {
  console.log(`Movies microservice running on port ${PORT}`);
});