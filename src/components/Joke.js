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
            <div> {props.setup}</div>
            <div> {props.delivery}</div>
        </div>
    )
}

export default Joke
export { TwoPartJoke }