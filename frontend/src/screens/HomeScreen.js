import React, { useState } from 'react';
import axios from 'axios';
import { Container } from "react-bootstrap"
import Menu from "../components/Menu"
import Joke, { TwoPartJoke } from "../components/Joke"

const HomeScreen = ({ isLightTheme, userData }) => {

    // sent to the Menu component as a prop, to receive the url for the GET request
    const [url, setUrl] = useState("")
    const getUrl = (url) => {
        setUrl(url)
    }

    //  Full response from the API
    const [jokeData, setJokeData] = useState({})

    const likedJoke = {
        category: jokeData.category,
        type: jokeData.type,
        joke: jokeData.joke
    }

    const addToLikes = () => {
        axios({
            method: 'post',
            url: '/Like',
            data: {
                category: "jokeData.category",
                type: "jokeData.type",
                joke: "jokeData.joke"
            }
        })
            // axios.post('/Like',{
            //     category: jokeData.category,
            //     type: jokeData.type,
            //     joke: jokeData.joke
            // })
            // .then(() => console.log("Added new joke!"))
            .catch((err) => console.log(err))
    }

    // send a request to "joke api" and handle the response appropriately
    const findJoke = async (event) => {
        try {
            const response = await axios.get(url)
            setJokeData(response.data)
        } catch {
            console.log("error")
        }
    }

    return (
        <main className="fade-in">
            <Container> {/* center the content */}
                <div className="search">
                    <Menu getUrl={getUrl} findJoke={findJoke} setJokeData={setJokeData} isLightTheme={isLightTheme} />
                    <p className="url">API Request: {url}</p>
                </div>
                {jokeData.error === false ? (jokeData.type === 'single' ?
                    <Joke category={jokeData.category} joke={jokeData.joke} isLightTheme={isLightTheme} addToLikes={addToLikes} userData={userData}></Joke>
                    : <TwoPartJoke category={jokeData.category} setup={jokeData.setup} delivery={jokeData.delivery} isLightTheme={isLightTheme} addToLikes={addToLikes} userData={userData}></TwoPartJoke>)
                    : (jokeData.error !== undefined ? <Joke category={"Error"} joke={`Could not find a joke that matches these specifications.`}></Joke>
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

export default HomeScreen