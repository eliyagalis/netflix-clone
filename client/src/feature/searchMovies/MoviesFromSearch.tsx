// import { useInfiniteQuery } from 'react-query';
// import axios from 'axios';
// import useSearchMovies from '../../hooks/useSearchMovies';
// import Card from '../../components/shared/Card';
// import React, { useEffect, useRef } from 'react'

// const MoviesFromSearch = ({ searchTerm }) => {
//     const {
//         data,
//         fetchNextPage,
//         hasNextPage,
//         isFetchingNextPage
//       } = useSearchMovies(searchTerm);
    
//       const allMovies = data?.pages.flatMap(p => p.movieAndSeries) ?? [];
    
//       return (
//         const allMovies = data?.pages.map(p => p.movieAndSeries)==null && [];
//         const sentinelRef = useRef<HTMLDivElement>(null);
      
//         useEffect(() => {
//           if (!sentinelRef.current || !hasNextPage) return;
      
//           const obs = new IntersectionObserver(entries => {
//             if (entries[0].isIntersecting) {
//               fetchNextPage();
//             }
//           });
//           obs.observe(sentinelRef.current);
      
//           return () => obs.disconnect();

//         }, [fetchNextPage, hasNextPage]);
      
//         return (
//           <div>
//             {allMovies.map(m => <Card key={m.id} movie={m} />)}
//             {/* אלמנט רדום בתחתית שאפשר “לתצפת עליו” */}
//             <div ref={sentinelRef} style={{ height: 1 }} />
//           </div>
//         )
//   )
// }

// export default MoviesFromSearch

