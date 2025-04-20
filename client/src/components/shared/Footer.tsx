import React from "react";
type FooterProps = {
    className?: string;
}

const Footer:React.FC<FooterProps> = ({className}) => {
    return (
        <div className={`${className}`}>
            <footer className="w-8/10 max-w-350 footer sm:footer-horizontal">
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
                <h6 className="">
                    Netflix-Clone
                </h6>
                <a target="_blank" className="" href="https://github.com/eliyagalis/netflix-clone/">
                    <i className="fa-brands fa-github"></i>
                </a>
            </div>
        </div>
    )
}

export default Footer