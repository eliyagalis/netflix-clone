import React from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store';
import { resetCurrentProfile, resetProfiles, setCurrentProfile } from '../../store/slices/profilesSlice';
import { IProfilePreview } from '../../types/IProfile';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import { logoutRequest } from '../../api/authApi';

const ProfilesHeaderList = () => {

    const profiles = useAppSelector((state) => state.profiles);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleProfileSwitch = (profile: IProfilePreview) => {
        dispatch(setCurrentProfile(profile));
        navigate('/browse');
    };

    const logoutHandler = () => {
        dispatch(resetProfiles());
        dispatch(logout());
        logoutRequest();
        navigate('/logout');
    }

    const manageHandler = () => {
        dispatch(resetCurrentProfile());
    }

    return (
        <div className='flex items-center'>

            <div className="dropdown dropdown-hover dropdown-end">
                <div tabIndex={0} role="button" className="flex gap-2 items-center">
                    <p className='block md:hidden lg:block text-sm'>{profiles.currentProfile?.name}</p>
                    <img src={profiles.currentProfile?.avatar} className="h-8 rounded-sm" />
                    <i className="fa-solid fa-caret-down" />
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-[rgba(0,0,0,0.7)] rounded-box z-1 w-50 p-3 shadow-sm">
                    {
                        profiles.profiles.map((p) => (
                            <li key={p.id} onClick={() => handleProfileSwitch(p)} className='text-gray-400 flex flex-row 
                            hover:text-gray-100 transition brightness-90 hover:brightness-100'>
                                <div className='flex'>
                                    <img className='h-6 rounded-sm' src={p.avatar} />
                                    {p.name}
                                </div>
                            </li>
                        ))
                    }
                    <li><div className="text-gray-400 hover:text-gray-100" onClick={manageHandler}>
                        Manage Profiles
                        <i className='fa-solid fa-pencil' />
                    </div></li>

                    <li><div className="text-gray-400 hover:text-gray-100" onClick={logoutHandler}>
                        Log Out
                        <i className='fa-solid fa-right-from-bracket' />
                    </div></li>
                </ul>
            </div>
        </div>
    )
}

export default ProfilesHeaderList