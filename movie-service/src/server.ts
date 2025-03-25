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

app.use('/api/v1/movies', movieRoutes); //TODO .../v1/movies
app.use("/api/v1/movies/genres",genreRouter);
app.use("*",(req,res)=>{
  console.log(req.path)
  console.log("not workingggg")
  res.status(404).json({message:"route not found"});
})
app.listen(PORT, () => {
  console.log(`Movies microservice running on port ${PORT}`);
});