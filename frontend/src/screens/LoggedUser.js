import React from 'react'
import { Container } from 'react-bootstrap'
import { UserJoke, TwoPartUserJoke, EmptyUserJoke } from '../components/Joke'
import { useSelector } from 'react-redux'

function User() {

    const userData = useSelector(state => state.userData)

    const emptyListCategory = <h1 className="emptyListHeader fade-in">Its not funny here...</h1>
    const emptyListJoke = <p className="emptyListContent fade-in">To add a joke to your collection press on the<br />'<i className="fa-solid fa-heart"></i>LIKE' button beneath a joke</p>

    return (
        <Container>
            <center className="fade-in">
                {userData._id && <h1 className="welcomeHeader fade-in">Welcome back {userData.firstName}!</h1>}
                {userData.jokes[0] && <h2 className="latestJokesHeader fade-in">Here are your latest jokes:</h2>}
                {
                    userData.jokes[0] ? userData.jokes.map((joke, index) => (
                        joke.joke ?
                            <UserJoke key={joke._id} joke={joke} index={index}></UserJoke>
                            : <TwoPartUserJoke key={joke._id} joke={joke} index={index}></TwoPartUserJoke>
                    ))
                        : userData._id && <EmptyUserJoke category={emptyListCategory} joke={emptyListJoke}></EmptyUserJoke>
                }
            </center >
        </Container>
    )
}

export default User