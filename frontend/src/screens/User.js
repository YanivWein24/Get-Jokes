import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Joke from '../components/Joke'

function User() {
    const [data, setData] = useState({
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        jokes: []
    })

    const getUserData = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "/user"
        }).then((res) => {
            console.log(res.data)
            console.log(res.data.email)
            const { _id, email, firstName, lastName, jokes } = res.data
            setData({ id: _id, email: email, firstName: firstName, lastName: lastName, jokes: jokes })
        })
    }

    useEffect(() => {
        // Update the document title using the browser API
        getUserData()
    }, []);

    return (
        <div>Welcome back {data.firstName}!
            {data.jokes[0] ? data.jokes.map(joke => (
                <Joke key={data.id} category={joke.category} joke={joke.joke}></Joke>
            )) : <h1>No Jokes Here</h1>}
        </div>
    )
}

export default User