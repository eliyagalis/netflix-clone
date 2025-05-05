import React from 'react'



const More = ({ onClick }: { onClick: () => void }) => {
  return (
    <div onClick={()=>onClick}><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#2A2A2A"/>
    <circle cx="20" cy="20" r="19" stroke="white" strokeOpacity="0.5" strokeWidth="2"/>
    <path d="M13.9995 18.0004L19.9995 24.0004L25.9995 18.0004" stroke="white" strokeWidth="1.6" strokeLinecap="square"/>
    </svg>
    </div>
  )
}

export default More