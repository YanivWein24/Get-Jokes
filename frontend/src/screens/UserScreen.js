import React from 'react'
import { Container } from 'react-bootstrap'
import { UserJoke, TwoPartUserJoke, EmptyUserJoke } from '../components/Joke'

function UserScreen({ userData, isLightTheme }) {

    const emptyListCategory = <h1 className="fade-in" style={{ fontSize: "1.5rem" }}>Its not funny here...</h1>
    const emptyListJoke = <p className="fade-in" style={{ fontSize: "1.3rem" }}>To add a joke to your collection press on the<br />'<i className="fa-solid fa-heart"></i>LIKE' button beneath a joke</p>

    return (
        <Container>
            <center className="fade-in">
                {userData.email && <h1 className="fade-in" style={{ marginTop: "2rem" }}>Welcome back {userData.firstName}!</h1>}
                {userData.jokes[0] && <h2 className="fade-in" style={{ color: "white", fontSize: "1rem" }}>Here are your latest jokes:</h2>}
                {
                    userData.jokes[0] ? userData.jokes.map((joke, index) => (
                        joke.joke ?
                            <UserJoke key={joke._id} category={joke.category} joke={joke.joke} isLightTheme={isLightTheme} index={index}></UserJoke>
                            : <TwoPartUserJoke key={joke._id} category={joke.category} setup={joke.setup} delivery={joke.delivery} isLightTheme={isLightTheme} index={index}></TwoPartUserJoke>
                    ))
                        : userData.email && <EmptyUserJoke isLightTheme={isLightTheme} category={emptyListCategory} joke={emptyListJoke}></EmptyUserJoke>
                }
            </center >
        </Container>
    )
}

export default UserScreen