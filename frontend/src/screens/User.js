import React from 'react'
import { UserJoke, EmptyUserJoke } from '../components/Joke'


function User({ userData, isLightTheme }) {
    return (
        <center className="fade-in">
            <h1>Welcome back {userData.firstName}!</h1>
            {userData.jokes[0] ? userData.jokes.map(joke => (
                <UserJoke key={joke.id} category={joke.category} joke={joke.joke} isLightTheme={isLightTheme}></UserJoke>
            ))
                : <EmptyUserJoke isLightTheme={isLightTheme} category="This place is not funny yet..." joke="To add a joke to your collection press on the Like button beneath the joke!"></EmptyUserJoke>}
        </center>
    )
}

export default User