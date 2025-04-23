import React from 'react'

interface LogoCard{
    src:string,
    alt:string,
    propsStyle:string
}
const LogoCardsPayment:React.FC<LogoCard> = ({src,alt,propsStyle}) => {
  return (
    <div>
       <img src={} alt={alt} className=""/>
    </div>
  )
}

export default LogoCardsPayment