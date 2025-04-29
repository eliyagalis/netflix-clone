import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { searchMoviesFormData, searchMoviesSchema } from '../../schemas/searchMoviesInput';
import { IMediaList, IMovieList, ISeriesList } from '../../types/IMovieList';
import { useNavigate } from 'react-router-dom';

const SearchMovie = () => {
  const [searchIsClicked, setSearchIsClicked] = useState({beforeInputOpened:false,afterInputFilled:false});
  const [closeInputIsClicked, setCloseInputIsClicked] = useState(false);
  const [moviesArray, setMoviesArray] = useState<(IMovieList | ISeriesList)[]>([]);
  const navigate=useNavigate()
  const {
      register,
      watch, //מקשר את האינפוטים לשדה הטופס 
      handleSubmit,//בודק אם אין שגיאות אם אין יפעיל את הפונקציה
      reset,
      formState: { errors }, //שולף את השגיאות מתוך הטופס
    } = useForm<searchMoviesFormData>({ //תבנה טופס לפי ההגדרה הזו 
      resolver: zodResolver(searchMoviesSchema), //תשתמש בואלידציה לפי הסכמה
    });
    const textValue = watch("textInput");
    const handleCloseInputBtn=()=>{
      setCloseInputIsClicked(true) 
      setSearchIsClicked({beforeInputOpened: false,afterInputFilled:false});
      setMoviesArray([]);
      reset()
      navigate('/browse');
    }
    const onSubmit = async(data:searchMoviesFormData ) => {
      try {

        const moviesByQuery=await axios.get<IMediaList>(`http://localhost:3000/movies/search?q=${data.textInput}`);
        setMoviesArray(moviesByQuery.data.movieAndSeries);
        setSearchIsClicked(prev=>({...prev,afterInputFilled:true}));
        return (<></>
        )
      } catch (error) {
        const defaultMovies=await axios.get<IMediaList>('/getMovies');//תביא לי סתם סרטים מהמאגר
        setMoviesArray(defaultMovies.data.movieAndSeries);
      }
    };
  return (
    <>
     {searchIsClicked.beforeInputOpened?(
      <form onSubmit={handleSubmit(onSubmit)} >
            <div className='ease-in border-white border-2 bg-none m-w-90 mh-70 p-1 text-white flex flex-row justify-between mx-auto mr-4'>
              <button className={`${textValue?'visible':'hidden'} ${closeInputIsClicked&& 'hidden'} bg-none mr-2`} onClick={handleCloseInputBtn}>
                <i className="fa-solid fa-xmark max-w-24 max-h-24"></i>
              </button>
              <input placeholder='Titles of movies or series...' className={`${closeInputIsClicked&& `hidden ease-out placeholder:hidden`} outline-none focus:outline-none flex-grow bg-transparent border-none border-transparent placeholder-white/80 ml-2`} {...register("textInput")}/>
              <button type='submit' className='max-w-50 max-h-50'><i className="fa-solid fa-magnifying-glass w-full h-full transition ml-2 mr-3"/></button>
            </div>
      </form>
        // {searchIsClicked.afterInputFilled &&(
        //   <MoviesFromSearch mediaList={moviesArray}/>
        // )}

      ):(
        <button 
          onClick={()=>{
            setSearchIsClicked({beforeInputOpened:true,afterInputFilled:false})
            setCloseInputIsClicked(false)
          }} 
          className='max-w-50 max-h-50 mr-4'>
            <i className={`fa-solid fa-magnifying-glass w-full h-full ${searchIsClicked.beforeInputOpened? 'scale-150 hidden':'hidden'} `} />
        </button>
      )
     }

    </>
  )
}

export default SearchMovie