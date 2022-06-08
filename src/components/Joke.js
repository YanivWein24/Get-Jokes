import React from 'react'

const Joke = (props) => {
    return (
        <div className="joke">
            <div className="category">Category: {props.category}</div>
            <div>{props.joke}</div>
        </div>
    )
}

const TwoPartJoke = (props) => {
    return (
        <div className="joke">
            <div className="category">Category: {props.category}</div>
            <div>Setup: {props.setup}</div>
            <div>Delivery: {props.delivery}</div>
        </div>
    )
}

export default Joke
export { TwoPartJoke }