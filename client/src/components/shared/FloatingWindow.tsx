import React from 'react'
import LandingForm from '../../feature/landing/LandingForm';
import { ICarouselCard } from '../../types/ICarouselCard';

type FloatingWindowProprs = {
    movieDetails: ICarouselCard;
    setMovieDetails: Function;
}

const FloatingWindow: React.FC<FloatingWindowProprs> = ({ movieDetails, setMovieDetails }) => {
    return (
        <div>
            <div onClick={() => setMovieDetails(null)}
                className={`fixed inset-0 bg-[rgba(0,0,0,0.6)] z-60 flex items-center justify-center`}>
            </div>
            <div className="fixed rounded-3xl z-100 inset-0 bg-white w-4/5 h-[80vh] max-w-180 max-h-180 m-auto overflow-y-auto transform border-0">
                <div className="relative">
                    <img className="w-full max-h-[60vh] object-cover" src={movieDetails.imageUrl} />
                    <button className="fixed btn btn-ghost btn-circle p-6 flex justify-center items-center shadow-0 top-1 right-1 text-white hover:bg-[rgb(148,148,148,0.5)] border-0"
                        onClick={() => setMovieDetails(null)}
                        title="close"
                    >
                        <i className="fa-regular fa-x font-thin text-3xl" />
                    </button>
                    <div className="absolute bottom-0 w-full h-30 bg-gradient-to-t from-[rgb(24,24,24)] to-transparent"></div>
                </div>
                <div className="py-4 px-8 text-white bg-[rgb(24,24,24)]">
                    <div className="text-3xl font-medium">{movieDetails.title}</div>
                    <div className="flex items-center gap-2 my-2">

                    <div className='p-1 px-2 bg-[#414141] flex rounded'>{movieDetails.releaseDate.split('-')[0]}</div>
                    <div className='p-1 px-2 bg-[#414141] flex rounded'>{movieDetails.ageRating}</div>
                    {
                        movieDetails.genre.map((g) => (
                            <div className='p-1 px-2 bg-[#414141] flex rounded' key={g}>{g}</div>
                        ))
                    }
                    </div>
                    <div className="text-lg py-2">{movieDetails.description}</div>
                    <LandingForm />
                </div>
            </div>
        </div>
    )
}

export default FloatingWindow