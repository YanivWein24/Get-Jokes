import React from 'react'

const Joke = ({ category, joke }) => {
    return (
        <div className="joke fade-in">
            <div className="jokeCategory">Category: {category}</div>
            <div>{joke}</div>
        </div>
    )
}

const TwoPartJoke = ({ category, setup, delivery }) => {
    return (
        <div className="joke fade-in">
            <div className="jokeCategory underline">Category: {category}</div>
            <div> {setup}</div>
            <div> {delivery}</div>
        </div>
    )
}

export default Joke
export { TwoPartJoke }