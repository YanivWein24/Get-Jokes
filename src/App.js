import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button } from "react-bootstrap"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Joke, { TwoPartJoke } from "./components/Joke"
import Menu from "./components/Menu"


function App() {

  // const url = `https://v2.jokeapi.dev/joke/Any?type=single`
  const [url, setUrl] = useState("")

  const getUrl = (url) => {
    setUrl(url)
  }
  console.log(url)

  const [data, setData] = useState({})
  const [category, setCategory] = useState("")
  const [joke, setJoke] = useState("")
  const [setup, setSetup] = useState("")
  const [delivery, setDelivery] = useState("")
  // const [blackList, setBlackList] = useState({})


  const getSearchState = (searchString, setSearchString) => {

  }

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
      const items = Object.keys(response.data.flags)
      console.log(Object.keys(response.data.flags))
      console.log(Object.values(response.data.flags))
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
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
