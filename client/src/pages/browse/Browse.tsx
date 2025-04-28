import React from 'react'
import MainCarousel from '../../feature/browse/MainCarousel'
import { movies } from '../../data/mock'
import LatestTrailerContainer from '../../feature/browse/LatestTrailerContainer'
import { useAppSelector } from '../../store/store'
import ProfileFeature from '../../feature/browse/ProfileFeature'
// import { Navigate } from 'react-router-dom'

const Browse = () => {

  const auth = useAppSelector((state) => state.auth);

  // if (auth.user?.status?.toString() !== 'ACTIVE') {
  //   // return <Navigate to={"/"} replace />
  // }

  return (
    <div>
      <ProfileFeature profiles={[
        {id:'1', avatar: '', name: 'Daniel'},
        {id:'2', avatar: '', name: 'Adele'},
        {id:'3', avatar: '', name: 'Eliya'},
        ]} limit={5}/>
      <LatestTrailerContainer trailer={movies[0]} />
      <div className='w-11/12 mx-auto z-999'>
        {/* <LatestTrailer trailer={movies[0]}/> */}

        <MainCarousel title='Top 10' movies={movies} />

        <MainCarousel title='Drama' movies={movies} />
        <MainCarousel title='Action' movies={movies} />
      </div>
    </div>
  )
}

export default Browse