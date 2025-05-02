import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import movieRoutes from './routes/movie.routes';
import genreRouter from './routes/genre.routes';
import searchRouter from './routes/search.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({origin:"*",credentials:true}));
app.use(express.json());

// Main API routes
app.use('/api/v1/movies', movieRoutes);
app.use('/api/v1/genres', genreRouter);
app.use('/api/v1/search', searchRouter);

// Netflix-style direct title access
app.get('/title/:id(\\d+)', (req, res) => {
    // Redirect to the frontend application with the correct URL
    // This handles direct link sharing
    res.redirect(`/browse?titleId=${req.params.id}`);
});

app.listen(PORT, () => {
  console.log(`Movies microservice running on port ${PORT}`);
});