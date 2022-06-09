import React, { useState } from 'react';
import axios from 'axios';
import { Container } from "react-bootstrap"
import Menu from "../components/Menu"
import Joke, { TwoPartJoke } from "../components/Joke"

const HomeScreen = () => {

    // sent to the Menu component as a prop, to receive the url for the GET request
    const [url, setUrl] = useState("")
    const getUrl = (url) => {
        setUrl(url)
    }

    //  Full response from the API
    const [data, setData] = useState({})

    // states for the Joke component
    const [category, setCategory] = useState("")
    const [joke, setJoke] = useState("")
    const [setup, setSetup] = useState("")
    const [delivery, setDelivery] = useState("")

    // send a request to "joke api" and handle the response appropriately
    const findJoke = async (event) => {
        try {
            const response = await axios.get(url)
            setData(response.data)
            setCategory(response.data.category)
            if (response.data.type === 'single') {
                setJoke(response.data.joke)
            } else {
                setSetup(response.data.setup)
                setDelivery(response.data.delivery)
            }
        } catch {
            console.log("error")
        }
    }

    return (
        <main className="fade-in">
            <Container> {/* center the content */}
                <div className="Search">
                    <Menu getUrl={getUrl} findJoke={findJoke} />
                    <p className="url">API Request: {url}</p>
                </div>
                {data.error === false ? (data.type === 'single' ? <Joke category={category} joke={joke}></Joke>
                    : <TwoPartJoke category={category} setup={setup} delivery={delivery}></TwoPartJoke>) : (data.error !== undefined ? <Joke category={"Error"} joke={`Could not find a joke that matches these specifications. Make sure to use at least one category.`}></Joke> : "")}
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