import React from 'react'
import { UserJoke, TwoPartUserJoke, EmptyUserJoke } from '../components/Joke'

function User({ userData, setUserData, isLightTheme }) {

    const emptyListCategory = "This place is not funny yet..."
    const emptyListJoke = <h1>To add a joke to your collection press on the '<i className="fa-solid fa-heart"></i>Like' button beneath the joke!</h1>

    return (
        <center className="fade-in">
            {userData.email ? <h1>Welcome back {userData.firstName}!</h1> : <h1>Please login to get access to your account </h1>}
            {userData.jokes[0] ? userData.jokes.map(joke => (
                joke.joke ?
                    <UserJoke key={joke._id} category={joke.category} joke={joke.joke} isLightTheme={isLightTheme} userData={userData} setUserData={setUserData}></UserJoke>
                    : <TwoPartUserJoke key={joke._id} category={joke.category} setup={joke.setup} delivery={joke.delivery} isLightTheme={isLightTheme}></TwoPartUserJoke>
            ))
                : userData.email && <EmptyUserJoke isLightTheme={isLightTheme} category={emptyListCategory} joke={emptyListJoke}></EmptyUserJoke>}
        </center>
    )
}

export default User