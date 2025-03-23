import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import movieRoutes from './routes/movie.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/movies', movieRoutes); //TODO .../v1/movies

app.listen(PORT, () => {
  console.log(`Movies microservice running on port ${PORT}`);
});