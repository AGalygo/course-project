import React from "react";
import "./CardItem.css"


function CardItem({ card, handleChoice, flipped, disabled }) {

    const handleClick = () => {
        if(!disabled) {
            handleChoice(card);
        }   
    }

    return (
        <div className="card">
            <div className = {flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="cardFront"/>
                <img className="back" 
                src="/images/moon.jpg" 
                onClick={handleClick}
                alt="cardBack"
                />
            </div>
        </div>
    )
}

export default CardItem