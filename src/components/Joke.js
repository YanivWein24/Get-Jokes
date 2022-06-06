import React from 'react'


const Joke = (props) => {
    return (
        <div className="joke">
            <div className="category">Category: {props.category}</div>
            <div className="Joke">{props.joke}</div>
        </div>
    )
}

export default Joke