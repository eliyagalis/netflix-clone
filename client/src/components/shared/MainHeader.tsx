import React from "react";
import { images } from "../../data/images";
import { Link, useLocation } from "react-router-dom";
import { typography } from "../../data/typography";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setCurrentProfile } from "../../store/slices/profilesSlice";
import ProfilesHeaderList from "../../feature/browse/ProfilesHeaderList";

type HeaderProps = {
    className?: string;
}

const MainHeader: React.FC<HeaderProps> = ({ className, }) => {

    const location = useLocation();
    const currentPath = location.pathname;

    const pathMap: { [key: string]: string } = {
        '/browse': 'Browse',
        '/browse/genres/tv': 'TV Shows',
        '/browse/genres/movies': 'Movies',
        '/latest': 'New & Popular',
        '/browse/mylist': 'My List'
    };

    const collapsedTitle = pathMap[currentPath] || 'Browse';

    const linkStyle = (path: string) =>
        currentPath === path
            ? `text-white font-bold ${typography.xxsmall} mx-3`
            : `text-gray-400 hover:text-white ${typography.xxsmall} mx-3`;


    return (
        <header className={`${className} fixed z-15 flex justify-center mx-auto w-full left-0 top-0 
            bg-[#141414] text-white
            `}>
            <div className="w-full px-5 sm:px-8 md:px-10 flex">
                <div className={`flex items-center`}>

                    <img
                        src={images.logo.src}
                        alt={images.logo.alt}
                        className={`block 
                        w-36 max-w-full`}
                    />
                </div>


                <div className="flex items-center w-full justify-between">
                    <nav className='navbar p-0 m-0 justify-between'>
                        <div className='hidden md:flex items-center mx-5'>
                            <Link to="/browse" className={linkStyle('/browse')}>Home</Link>
                            <Link to="/browse/genres/tv" className={linkStyle('/browse/genres/tv')}>TV Shows</Link>
                            <Link to="/browse/genres/movies" className={linkStyle('/browse/genres/movies')}>Movies</Link>
                            <Link to="/latest" className={linkStyle('/latest')}>New & Popular</Link>
                            <Link to="/browse/mylist" className={linkStyle('/browse/mylist')}>My List</Link>
                        </div>

                        <div className='flex md:hidden items-center mx-5'>
                            <div className="dropdown dropdown-hover">
                                <div tabIndex={0} role="button" className="btn btn-ghost m-1">{collapsedTitle}</div>
                                <ul tabIndex={0} className="dropdown-content menu bg-[rgba(0,0,0,0.7)] rounded-box z-1 w-52 p-3 shadow-sm">
                                    {Object.keys(pathMap).map((path) => (
                                        <li key={path}>
                                            <Link to={path} className={currentPath === path ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}>
                                                {pathMap[path]}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <ProfilesHeaderList />
                    </nav>
                </div>

            </div>
        </header>
    );
};

export default MainHeader;
