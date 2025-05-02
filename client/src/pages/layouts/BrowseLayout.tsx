import { Outlet, } from 'react-router-dom'
import Footer from '../../components/shared/Footer'
import MainHeader from '../../components/shared/MainHeader'

const BrowseLayout = () => {
    
    return (
        <div className="flex flex-col min-h-screen bg-[#141414] text-white">
            <MainHeader />
            <br/><br/>
            <main className="w-full mx-auto flex-1">
                <Outlet />
            </main>

            <footer className="w-9/10 mx-auto">
                <Footer />
            </footer>
        </div>
    )
}

export default BrowseLayout
