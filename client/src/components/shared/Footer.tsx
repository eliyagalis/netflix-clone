import React from "react";
type FooterProps = {
    className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
    return (
        <div className={`${className} py-10 mx-auto`}>
            <div className="w-9/10 max-w-350 mx-auto">
                    <a className="link link-hover">Questions? Contact us.</a>
                    
                <footer className="footer py-3 sm:footer-horizontal">
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
                <div className="py-5">
                    <h6>
                        Netflix-Clone
                    </h6>
                    <a target="_blank" className="" href="https://github.com/eliyagalis/netflix-clone/">
                        <i className="fa-brands fa-github"></i>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer