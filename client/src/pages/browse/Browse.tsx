import MainCarousel from '../../feature/browse/MainCarousel'
import { movies } from '../../data/mock'
import LatestTrailerContainer from '../../feature/browse/LatestTrailerContainer'

const Browse = () => {



  return (
    <div>
      {/* <ProfileFeature profiles={[
        {id:'1', avatar: '', name: 'Daniel'},
        {id:'2', avatar: '', name: 'Adele'},
        {id:'3', avatar: '', name: 'Eliya'},
        ]} limit={5}/> */}
      <LatestTrailerContainer trailer={movies[0]} />
      <div className='w-11/12 mx-auto z-999'>
        {/* <LatestTrailer trailer={movies[0]}/> */}

        <MainCarousel isCarousel title='Top 10' movies={movies} />

        <MainCarousel isCarousel title='Drama' movies={movies} />
        <MainCarousel isCarousel title='Action' movies={movies} />
      </div>
    </div>
  )
}

export default Browse