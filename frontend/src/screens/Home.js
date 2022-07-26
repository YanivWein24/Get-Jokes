import React from 'react'
import { Container } from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import Menu from "../components/Menu"
import Joke, { TwoPartJoke, EmptyUserJoke } from "../components/Joke"
import jokeActions from '../actions/jokeActions'
import urlAction from '../actions/urlAction'

const Home = () => {

    const jokeData = useSelector(state => state.joke)
    const url = useSelector(state => state.url)
    const dispatch = useDispatch()

    // sent to the Menu component as a prop, to receive the url for the GET request
    const getUrl = (url) => {
        // setUrl(url)
        dispatch(urlAction(url))
    }

    // send a request to "joke api" and handle the response
    const findJoke = async () => {
        try {
            const response = await axios.get(url)
            dispatch(jokeActions("getJoke", response.data))
        } catch {
            console.log("error - can't receive response from API")
        }
    }

    // Send a request to the backend to add the current joke to the user's array. 
    const addToLikes = () => {
        axios({
            method: 'post',
            url: '/like',
            headers: {
                'Content-Type': 'application/json',
            },
            // check if the joke is 'single' or 'two part' and send the joke's data accordingly
            data: jokeData.joke ? {
                category: jokeData.category,
                type: jokeData.type,
                joke: jokeData.joke
            } : {
                category: jokeData.category,
                type: jokeData.type,
                setup: jokeData.setup,
                delivery: jokeData.delivery
            }
        })
    }

    return (
        <main className="fade-in">
            <Container> {/* center the content */}
                <div className="searchJokeMenu">
                    <Menu getUrl={getUrl} findJoke={findJoke} />
                    <p className="url">API Request: {url}</p>
                </div>
                {jokeData.error === false ? (jokeData.type === 'single' ?
                    <Joke category={jokeData.category} joke={jokeData.joke} addToLikes={addToLikes}></Joke>
                    : <TwoPartJoke category={jokeData.category} setup={jokeData.setup} delivery={jokeData.delivery} addToLikes={addToLikes}></TwoPartJoke>)
                    : (jokeData.error !== undefined ? <EmptyUserJoke category={"Error"} joke={`Could not find a joke that matches these specifications.`}></EmptyUserJoke>
                        : "")}
                {/* first we check if we received a response from the api by checking the data.error property
          if its false, this means we received a successful response. so now we check if the type of the response is "single" or "twoPart" and render the output component accordingly.
          if data.error !== false then it could mean two things:
          1. data.error === undefined - we didn't send a request yet, so "data" is undefined (therefore "data.error" is also undefined).
          in this case we will just return an empty string.
          2. data.error === true - this means we sent a wrong request and responded with an error.
          in this case we will return an error message using the "Joke" component     */}
            </Container>
        </main>
    )
}

export default Home