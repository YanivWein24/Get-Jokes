import React from 'react'

const Joke = (props) => {
    return (
        <div className="joke">
            <div className="jokeCategory">Category: {props.category}</div>
            <div>{props.joke}</div>
        </div>
    )
}

const TwoPartJoke = (props) => {
    return (
        <div className="joke">
            <div className="jokeCategory underline">Category: {props.category}</div>
            <div><span className="underline">Setup:</span> {props.setup}</div>
            <div><span className="underline">Delivery:</span> {props.delivery}</div>
        </div>
    )
}

export default Joke
export { TwoPartJoke }