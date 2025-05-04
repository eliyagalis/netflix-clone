import ProfileList from '../../components/profiles/ProfileList';

const ProfileFeature = () => {

    

    return (
        <>
                <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-[#141414] z-[100]">

                    <div className="bg-black min-h-screen w-full pt-20">
                        <h1 className="text-white text-center text-3xl mb-10">Who's watching?</h1>
                        <ProfileList />
                    </div>
                </div>
        </>);

};

export default ProfileFeature;
