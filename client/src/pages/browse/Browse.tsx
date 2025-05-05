import { useEffect, useState } from 'react'
import MainCarousel from '../../feature/browse/MainCarousel'
import LatestTrailerContainer from '../../feature/browse/LatestTrailerContainer'
import IMyListItem from '../../types/IMyListItem'
import { getPopularMoviesRequest, getTopRatedMoviesRequest, getUpcomingMoviesRequest } from '../../api/moviesApi'

const Browse = () => {
  const [movies, setMovies] = useState<{
    popular: IMyListItem[],
    topRated: IMyListItem[],
    upcoming: IMyListItem[]
  }>({
    popular: [],
    topRated: [],
    upcoming: []
  })

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      try {
        const [popularData, topRatedData, upcomingData] = await Promise.all([
          getPopularMoviesRequest(),
          getTopRatedMoviesRequest(),
          getUpcomingMoviesRequest()
        ])

        setMovies({
          popular: popularData,
          topRated: topRatedData,
          upcoming: upcomingData
        })

      } catch (err) {
        console.error('Error fetching movies:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  if (loading) {
    return <div className="text-center mt-10 text-white">Loading movies...</div>
  }

  return (
    <div>
      {movies.popular.length > 0 && (
        <LatestTrailerContainer trailer={movies.popular[0]} />
      )}

      <div className="w-11/12 mx-auto z-999">
        <MainCarousel isCarousel title="Popular" movies={movies.popular} />
        <MainCarousel isCarousel title="Top Rated" movies={movies.topRated} />
        <MainCarousel isCarousel title="Upcoming" movies={movies.upcoming} />
      </div>
    </div>
  )
}

export default Browse
