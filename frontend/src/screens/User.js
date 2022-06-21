import React from 'react'
import { UserJoke } from '../components/Joke'

function User({ data, isLightTheme }) {
    return (
        <center className="fade-in">
            <h1>Welcome back {data.firstName}!</h1>
            {data.jokes[0] ? data.jokes.map(joke => (
                <UserJoke key={joke.id} category={joke.category} joke={joke.joke} isLightTheme={isLightTheme}></UserJoke>
            ))
                : <h1>No Jokes Here</h1>}
        </center>
    )
}

export default User