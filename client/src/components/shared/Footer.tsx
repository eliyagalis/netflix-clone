const Footer = () => {
    return (
        <div>
            <footer className="w-8/10 max-w-350 mx-auto footer sm:footer-horizontal text-neutral-content">
                <nav>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>
            <div className="w-8/10 max-w-350 mx-auto py-20">
                <h6 className="text-neutral-content">
                    Netflix-Clone
                </h6>
            </div>
        </div>
    )
}

export default Footer