import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Movie {
  id: string;
  title: string;
  videoUrl: string;
  description: string;
}

const Watch = () => {
  const { id } = useParams<{ id: string }>(); // Get the dynamic id from URL
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);

        const res = await fetch(`/api/movies/${id}`);
        const data = await res.json();

        setMovie(data);
      } catch (err) {
        console.error("Failed to fetch movie", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  if (loading) return <div>Loading movie...</div>;

  if (!movie) return <div>Movie not found</div>;

  return (
    <div className='min-h-screen p-4 bg-black text-white'>
      <h1 className='text-3xl font-bold mb-4'>{movie.title}</h1>
      
      <video 
        controls 
        className='w-full max-w-4xl mx-auto mb-6' 
        src={movie.videoUrl}
      />

      <p>{movie.description}</p>
    </div>
  );
};

export default Watch;
