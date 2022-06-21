import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Joke from '../components/Joke'

function User({ data }) {

    return (
        <div>
            <h1>Welcome back {data.firstName}!</h1>
            {data.jokes[0] ? data.jokes.map(joke => (
                <Joke key={data.id} category={joke.category} joke={joke.joke}></Joke>
            ))
                : <h1>No Jokes Here</h1>}
        </div>
    )
}

export default User