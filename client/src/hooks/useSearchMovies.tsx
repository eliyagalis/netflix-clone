// import React from 'react'
// import { useInfiniteQuery } from '@tanstack/react-query';
// import { IMediaList } from '../types/IMovieList';
// import { string } from 'zod';

// function useSearchMovies(searchTerm: string) {
//     return {
//         data,            // כל הדפים שהתבקשו עד כה
//         fetchNextPage,   // פונקציה שמביאה את הדף הבא
//         hasNextPage,     // בוליאני: האם יש עוד דפים?
//         isFetchingNextPage, // בוליאני: האם כרגע טוענים דף נוסף?
//         status,          // 'loading' | 'error' | 'success'
//         error}=useInfiniteQuery<
//         [string,string],
//         {   
//             page: number,
//             movieAndSeries: <ISeriesList>|<IMovieList>)[],
//             totalPages: number,
//             }
//         >(      ['movies', searchTerm],,//הQUERY 
//       ({ pageParam = 1 }) =>
//         axios.post(`/movies?search=${searchTerm}&page=${pageParam}&pageSize=20`,{
           
//           })
//           .then(res => res.data),
//       {
//         getNextPageParam: lastPage =>
//           lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
//       }
//     );
//   }
  

// export default useSearchMovies