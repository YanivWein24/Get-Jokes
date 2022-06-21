import React from 'react'
import { UserJoke } from '../components/Joke'

function User({ userData, isLightTheme }) {
    return (
        <center className="fade-in">
            <h1>Welcome back {userData.firstName}!</h1>
            {userData.jokes[0] ? userData.jokes.map(joke => (
                <UserJoke key={joke.id} category={joke.category} joke={joke.joke} isLightTheme={isLightTheme}></UserJoke>
            ))
                : <h1>No Jokes Here</h1>}
        </center>
    )
}

export default User