import React, { useRef, useEffect } from 'react'
import { useInfiniteQuery }        from '@tanstack/react-query'
import axios                        from 'axios'
import { IMediaList } from '../../types/IMovieList'
import Card from '../../components/shared/Card'

interface MovieResultsProps {
  searchTerm: string
  onClose:    () => void
}

export default function MovieResults({ searchTerm, onClose }: MovieResultsProps) {
  // 1. מחזיקים את ה־infiniteQuery
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    remove     // זה שתרפרש את ה־cache (React Query)
  } = useInfiniteQuery(
    ['movies', searchTerm],               // <-- queryKey (מזהה ייחודי)
    ({ pageParam = 1 }) =>
      axios
        .get<IMediaList>(`/movies/search?q=${encodeURIComponent(searchTerm)}&page=${pageParam}&pageSize=20`)
        .then(res => res.data),{getNextPageParam: last => last.page < last.totalPages ? last.page + 1 : undefined}
  )

  // 2. בונים מערך אחיד מסדרות + סרטים
  const allMovies = data?.pages.flatMap(p => p.movieAndSeries) ?? []

  // 3. Intersection Observer לפרגמנט האחרון
  const sentinelRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!sentinelRef.current || !hasNextPage) return
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) fetchNextPage()
    })
    obs.observe(sentinelRef.current)
    return () => obs.disconnect()
  }, [fetchNextPage, hasNextPage])

  // 4. כפתור סגירה שמנקה גם את ה־cache
  const handleClose = () => {
    remove()   // מוחק את כל הנתונים ששמורים תחת queryKey = ['movies', searchTerm]
    onClose()  // קודם כל יתנתק מ-MovieResults
  }

  return (
    <div className="results-container">
      <button onClick={handleClose}>✕</button>
      <div className="grid gap-4">
        {allMovies.map(item => (
          <Card
            key={'id' in item ? item.id : item.serieId}
            movie={item}
          />
        ))}
      </div>
      {hasNextPage && <div ref={sentinelRef} style={{ height: 1 }} />}
      {isFetchingNextPage && <span><i className='loading-spinner'></i></span>}
    </div>
  )
}
