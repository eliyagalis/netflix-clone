import React from 'react'
import Header from '../components/shared/Header'
import { Link, Outlet } from 'react-router-dom'
import { typography } from '../data/typography'
import Footer from '../components/shared/Footer'

const BrowseLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#141414] text-white">
            <div className="w-9/10 mx-auto">
                <Header link='/browse' isBrowse>
                    <nav className='flex items-center justify-between w-full'>
                        <div className='hidden md:flex items-center mx-5'>
                            <Link to={"/browse"}
                                className={`text-white ${typography.xxsmall} mx-3 font-semibold`}>Home</Link>
                            <Link to={"/browse/genres/tv"}
                                className={`text-white ${typography.xxsmall} mx-3 font-semibold`}>TV Shows</Link>
                            <Link to={"/browse/genres/movies"}
                                className={`text-white ${typography.xxsmall} mx-3 font-semibold`}>Movies</Link>
                            <Link to={"/latest"}
                                className={`text-white ${typography.xxsmall} mx-3 font-semibold`}>New & Popular</Link>
                            <Link to={"/browse/mylist"}
                                className={`text-white ${typography.xxsmall} mx-3 font-semibold`}>My List</Link>
                        </div>
                        <div className='flex md:hidden items-center mx-5'>
                            Collapsing Nav
                        </div>
                        <div className='flex items-center'>
                            <p className='text-white'>Logout</p>
                        </div>
                    </nav>
                </Header>
            </div>

            <main className="w-11/12 mx-auto flex-1">
                {<Outlet />}
            </main>

            <footer className="w-9/10 mx-auto">
                <Footer />
            </footer>
        </div>
    )
}

export default BrowseLayout
