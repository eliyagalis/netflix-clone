import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import MainCarousel from '../../feature/browse/MainCarousel';
import { IMediaList } from '../../types/IMovieList';
import { IMovieCard } from '../../types/IMovieCard';
import { ISeriesCard } from '../../types/ISeriesCard';

const SearchMoviePage = () => {
  const [movies, setMovies] = useState<IMediaList>([])
    const [searchParams,setSearcParams]=useSearchParams();
    const query=searchParams.get('q');
    const page=1;
    // useEffect(() => {
      
    //   const fetchMovies = async () => {
    //     try {
    //       const res = await axios.get<IMediaList>(`http://localhost:3000/api/v1/movies/search/multi?query=${query}&page=${page}`);
    //       setMovies(res.data.movieAndSeries);
    //     } catch (error) {
    //       console.error("Failed to fetch movies:", error);
    //     }
    //   };
    //   fetchMovies();
    //   return () => {};
    //   }
  
    //   }, [page])
    
  return (
    <></>
    // <div className={`bg-black w-${innerWidth} h-${innerHeight*9/16} items-center justify-center`}>
    // //     <button onClick={handleClose} className='top-0 left-0 text-white'>✕</button>
    // //           {/* {!isError? ( */}
    // //     <MainCarousel isCarousel={false} movies={movies} />
    // //           {/* ):( <></>
    // //           // <DefaultSearchComponent/>
    // //           )} */}
    // // </div>
  )
}

export default SearchMoviePage
// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import axios from "axios";

// type Movie = {
//   id: string;
//   title: string;
//   posterUrl: string;
//   // הוסף עוד שדות לפי הנתונים שלך
// };

// const SearchPage = () => {
//   const [searchParams] = useSearchParams();
//   const query = searchParams.get("q");
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!query) return;

//     const fetchMovies = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const response = await axios.get(`/api/v1/movies/search?q=${query}`);
//         setMovies(response.data); // הנח שזו רשימת סרטים
//       } catch (err) {
//         setError("Failed to load search results.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovies();
//   }, [query]);

//   return (
//     <div>
//       <h2>Search results for: "{query}"</h2>
//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {movies.length === 0 && !loading && <p>No results found.</p>}
//       <ul>
//         {movies.map((movie) => (
//           <li key={movie.id}>
//             <img src={movie.posterUrl} alt={movie.title} width={100} />
//             <p>{movie.title}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };