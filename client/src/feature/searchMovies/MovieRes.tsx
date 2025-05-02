import React, { useRef, useEffect, useState } from 'react'
import { useInfiniteQuery,useQueryClient }        from '@tanstack/react-query'
import axios                        from 'axios'
import { IMediaList, IMovieList, ISeriesList } from '../../types/IMovieList'
import MainCarousel from '../browse/MainCarousel'
import { IMovieCard } from '../../types/IMovieCard'
import { ISeriesCard } from '../../types/ISeriesCard'
import { useNavigate } from 'react-router-dom'

interface MovieResultsProps {
  searchTerm: string
}
type MoviesPageRes={
  page: number;
  totalPages: number;
  data: IMediaList;
}
data: {
  pages: IMediaList[];
  pageParams: number[]; // לדוגמה: [1, 2, 3] אם כבר נטענו 3 עמודים
}
const MovieResults=({ searchTerm }: MovieResultsProps) =>{
  const [isError, setIsError] = useState(false);
  const [moviesRes, setMoviesRes] = useState<(IMovieCard|ISeriesCard)[]>([])
  const navigate=useNavigate();
  const queryClient = useQueryClient();//נותן גישה ל־cache של react-query (למשל למחיקה).
  
  const { 
     data,
     fetchNextPage, //מביא את העמוד הבא.
      hasNextPage, 
      isFetchingNextPage } = useInfiniteQuery<IMediaList, Error>( // מאפשר שליפה מדורגת של נתונים (pagination).
    { 
      queryKey: ['movies', searchTerm], 
      queryFn: async({ pageParam = 1 }) => {
        try {
          const moviesFromApi=await axios.get<MoviesPageRes>(`http://localhost:3000/api/v1/movies/search?q=${encodeURIComponent(searchTerm)}&page=${pageParam}&pageSize=20`)
          // setMoviesRes(prev => [...prev, ...(moviesFromApi.data.movieAndSeries as (IMovieCard | ISeriesCard)[])]);
          return moviesFromApi.data;
        } catch (error) {
          console.log(error);
          setIsError(true);
        }
      },
      getNextPageParam: (lastObj:MoviesPageRes) => lastObj.page < lastObj.totalPages ? lastObj.page + 1 : undefined, // מחזירה את מספר העמוד הבא, או undefined אם נגמרו העמודים
       
  })
  const allMovies:(IMovieCard | ISeriesCard)[] =data?.pages.flatMap((lastPage) => lastPage.) ?? [];
  // 🧠 סיכום
  
  // שדה ב־data	תיאור
  // pages	מערך של כל הדפים שהוחזרו מהשרת (IMediaList[])
  // pages[i].movieAndSeries	תוצאות הסרטים והסדרות בעמוד i
  // pages[i].page	מספר העמוד
  // pages[i].totalPages	מספר העמודים הכולל
  // pageParams	הפרמטרים ששימשו לטעינה (בד"כ מספרי עמודים)

  const sentinelRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!sentinelRef.current || !hasNextPage) 
      return;
    const obs = new IntersectionObserver(entries => { // נוצר Observer שצופה מתי האלמנט sentinelRef נכנס לפריים.
      if (entries[0].isIntersecting) 
        fetchNextPage();  // כשזה קורה → קוראים ל־fetchNextPage.
    })
    obs.observe(sentinelRef.current);
    return () => obs.disconnect(); // מתנתק אוטומטית כאשר הקומפוננטה מוסרת.
  }, [fetchNextPage, hasNextPage])

  // 4. כפתור סגירה שמנקה גם את ה־cache
  const handleClose = () => {
    queryClient.removeQueries({ queryKey: ['movies', searchTerm] });
    navigate('/browse')  // קודם כל יתנתק מ-MovieResults
  }

  return (
    <div className="results-container bg-black z-[999]">
      <button onClick={handleClose} className='top-0 left-0 text-white'>✕</button>
      {!isError? (
        <MainCarousel isCarousel={false} movies={moviesRes} />
      ):( <></>
      // <DefaultSearchComponent/>
      )}
  
      {/*   שנשים  לאלמנט רפרנס בתחתית הדף כדי לצפות מתי המשתמש הגיע לתחתית  */}
      {hasNextPage && <div ref={sentinelRef} style={{ height: 1 }} />} 
      {/* כשה־div עם ref={sentinelRef} נכנס לפריים (scroll למטה), אנחנו מביאים עוד עמוד (fetchNextPage()). */}
      {isFetchingNextPage && <span><i className='loading-spinner'></i></span>}
    </div>
  )
      {/* <div className="grid gap-4" ref={cardRef}>
        {allMovies.map(item => (
          <CarouselItem 
            index={'id' in item ? item.id : item.serieId}
            item={item}
            onMouseEnter={handleEnterTile}
            onMouseLeave={handleLeaveTile}
          />
        ))}
      </div> */}
}
export default MovieResults;
