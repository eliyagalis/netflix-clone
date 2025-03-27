const Footer = () => {
    return (
        <div>
            <footer className="w-8/10 max-w-350 footer sm:footer-horizontal text-neutral-content">
                <nav>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                </nav>
                <nav>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                </nav>
                <nav>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                </nav>
            </footer>
            <div className="w-8/10 max-w-350 py-20">
                <h6 className="text-neutral-content">
                    Netflix-Clone
                </h6>
                <a target="_blank" className="text-white" href="https://github.com/eliyagalis/netflix-clone/">
                    <i className="fa-brands fa-github"></i>
                </a>
            </div>
        </div>
    )
}

export default Footer