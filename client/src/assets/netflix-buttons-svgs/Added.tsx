import React from 'react'

const Added = ({ onClick }: { onClick: () => void }) => {
    return (
        <div onClick={onClick}>
            <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20.5" r="20" fill="white" />
                <circle cx="20" cy="20.5" r="19" stroke="black" strokeOpacity="0.5" strokeWidth="2" />
                <path d="M13 21.5L18 26.5L27 17.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

        </div>
    )
}

export default Added