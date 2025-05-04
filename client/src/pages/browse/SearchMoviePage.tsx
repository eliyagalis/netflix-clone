import React from 'react'
import { useSearchParams } from 'react-router-dom'
import MainCarousel from '../../feature/browse/MainCarousel';

const SearchMoviePage = () => {
    const [searchParams,setSearcParams]=useSearchParams();
    const page=searchParams.get('q');
    
  return (
    <div className={`bg-black w-${innerWidth} h-${innerHeight*9/16} items-center justify-center`}>
        <button onClick={handleClose} className='top-0 left-0 text-white'>✕</button>
              {/* {!isError? ( */}
        <MainCarousel isCarousel={false} movies={} />
              {/* ):( <></>
              // <DefaultSearchComponent/>
              )} */}
    </div>
  )
}

export default SearchMoviePage