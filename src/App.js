import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button } from "react-bootstrap"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Joke, { TwoPartJoke } from "./components/Joke"
import Menu from "./components/Menu"


function App() {

  const [url, setUrl] = useState("")

  const getUrl = (url) => {
    setUrl(url)
  }

  const [data, setData] = useState({})
  const [category, setCategory] = useState("")
  const [joke, setJoke] = useState("")
  const [setup, setSetup] = useState("")
  const [delivery, setDelivery] = useState("")
  // const [blackList, setBlackList] = useState({})

  const findJoke = async (event) => {
    try {
      const response = await axios.get(url)
      console.log(response.data)
      setData(response.data)
      setCategory(response.data.category)
      if (response.data.type === 'single') {
        setJoke(response.data.joke)
      } else {
        setSetup(response.data.setup)
        setDelivery(response.data.delivery)
      }
      // setBlackList(response.data.flags)
      // const items = Object.keys(response.data.flags)
      // console.log(Object.keys(response.data.flags))
      // console.log(Object.values(response.data.flags))
      // items.forEach((key, value) => {
      // console.log(`${key}: ${items[key]}`);
      // })
    } catch {
      console.log("error")
    }
  }

  return (
    <div className="App">
      <Header />
      <main>
        <Container> {/* center the content */}
          <div className="Search">
            <Menu getUrl={getUrl} findJoke={findJoke} />
            <p className="url">API Request: {url}</p>
          </div>
          {data.error === false ? (data.type === 'single' ? <Joke category={category} joke={joke}></Joke>
            : <TwoPartJoke category={category} setup={setup} delivery={delivery}></TwoPartJoke>) : (data.error !== undefined ? <Joke category={"Error"} joke={"Could not find a joke that matches these specifications"}></Joke> : "")}
          {/* first we check if we received a response from the api by checking the data.error property. 
          if its false this means we received a successful response, so now we check if the type of the response is "single" or "twoPart" and render the output component accordingly.
          if data.error !== false then it could mean two things:
          1. we didn't send a request yet, so "data" is undefined (therefore "data.error" is also undefined), in this case we will just return an empty string.
          2. data.error === true this means we sent a wrong request and responded with an error. in this case we will render the error inside the "Joke" component     */}
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
