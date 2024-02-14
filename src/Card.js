import React from "react"

const Card = ({ cardInfo }) => {
    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;
   
    return (
        <img src={cardInfo.data.cards[0].image}
            style={{ transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)` }} />
    )
}

export default Card