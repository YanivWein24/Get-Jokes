import React from 'react'
import { Container } from 'react-bootstrap'
import { UserJoke, TwoPartUserJoke, EmptyUserJoke } from '../components/Joke'

function User({ userData, setUserData, isLightTheme }) {

    const emptyListCategory = <h1 style={{ fontSize: "1.5rem" }}>Its not funny here...</h1>
    const emptyListJoke = <h1 style={{ fontSize: "1.3rem" }}>To add a joke to your collection press on the '<i className="fa-solid fa-heart"></i>Like' button beneath a joke</h1>

    return (
        <Container>
            <center className="fade-in">
                {userData.email ? <h1 style={{ marginTop: "2rem" }}>Welcome back {userData.firstName}!</h1> : <h1 style={{ fontSize: "2rem", marginTop: "1rem" }}>Please login to get access to your account </h1>}
                {
                    userData.jokes[0] ? userData.jokes.map((joke, index) => (
                        joke.joke ?
                            <UserJoke key={joke._id} category={joke.category} joke={joke.joke} isLightTheme={isLightTheme} userData={userData} setUserData={setUserData} index={index}></UserJoke>
                            : <TwoPartUserJoke key={joke._id} category={joke.category} setup={joke.setup} delivery={joke.delivery} isLightTheme={isLightTheme} index={index}></TwoPartUserJoke>
                    ))
                        : userData.email && <EmptyUserJoke isLightTheme={isLightTheme} category={emptyListCategory} joke={emptyListJoke}></EmptyUserJoke>
                }
            </center >
        </Container>
    )
}

export default User