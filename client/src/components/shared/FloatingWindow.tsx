import React, { useEffect, useState } from 'react'
import LandingForm from '../../feature/landing/LandingForm';
import IMyListItem, { IMovieDetails } from '../../types/IMyListItem';
import { getMovieDetailsRequest } from '../../api/moviesApi';

type FloatingWindowProps = {
    movieDetails: string; // ID of the movie
    setMovieDetails: Function;
}

const FloatingWindow: React.FC<FloatingWindowProps> = ({ movieDetails, setMovieDetails }) => {
    const [movie, setMovie] = useState<IMovieDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            setLoading(true);
            try {
                const data = await getMovieDetailsRequest(Number(movieDetails));
                setMovie(data);
            } catch (err) {
                console.error('Error fetching movie details:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movieDetails]);

    if (loading) {
        return (
            <div>
                <div className="fixed inset-0 bg-black bg-opacity-60 z-40" />
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 
                              bg-white rounded-3xl w-4/5 max-w-4xl p-8 flex items-center justify-center">
                    <div className="text-lg">Loading...</div>
                </div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div>
                <div className="fixed inset-0 bg-black bg-opacity-60 z-40" />
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 
                              bg-white rounded-3xl w-4/5 max-w-4xl p-8">
                    <h3 className="text-xl font-medium mb-4">Error</h3>
                    <button
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
                        onClick={() => setMovieDetails(null)}
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div
                onClick={() => setMovieDetails(null)}
                className="fixed inset-0 bg-black bg-opacity-30 z-40 flex items-center justify-center"
            />

            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 
                          bg-white rounded-3xl w-4/5 max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">

                <div className="relative">
                    {movie.backdrop_url && (
                        <img
                            className="w-full max-h-[40vh] object-cover"
                            src={movie.backdrop_url}
                            alt={movie.title || 'Movie backdrop'}
                        />
                    )}

                    <button
                        className="absolute top-2 right-2 p-2 rounded-full bg-black bg-opacity-30 text-white
                                 hover:bg-opacity-50 transition-all"
                        onClick={() => setMovieDetails(null)}
                        title="close"
                    >
                        <i className="fa-regular fa-x font-thin text-xl" />
                    </button>

                    {movie.backdrop_url && (
                        <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-[rgb(24,24,24)] to-transparent" />
                    )}
                </div>

                <div className="py-4 px-6 text-white bg-[rgb(24,24,24)] overflow-y-auto">
                    <h2 className="text-2xl font-medium mb-2">{movie.title}</h2>

                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        {movie.ageRestriction && (
                            <div className="p-1 px-2 bg-[#414141] rounded text-sm">
                                {movie.ageRestriction}
                            </div>
                        )}
                        {movie.genres && movie.genres.map((genre) => (
                            <div className="p-1 px-2 bg-[#414141] rounded text-sm" key={genre.id}>
                                {genre.name}
                            </div>
                        ))}

                    </div>

                    {movie.overview && (
                        <p className="text-base mb-4">{movie.overview}</p>
                    )}

                    <LandingForm />
                </div>
            </div>
        </div>
    )
}

export default FloatingWindow