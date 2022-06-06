import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button } from "react-bootstrap"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Joke from "./components/Joke"
import Menu from "./components/Menu"


function App() {

  const url = `https://v2.jokeapi.dev/joke/Any?type=single`
  const [data, setData] = useState({})
  const [category, setCategory] = useState("")
  const [joke, setJoke] = useState("")
  // const [blackList, setBlackList] = useState({})

  const findJoke = async (event) => {
    const response = await axios.get(url)
    setData(response.data)
    setCategory(response.data.category)
    setJoke(response.data.joke)
    // setBlackList(response.data.flags)
    // const items = Object.keys(response.data.flags)
    // // console.log(Object.keys(response.data.flags))
    // items.forEach((key, value) => {
    //   console.log(`${key}: ${items[key]}`);
    // })
  }


  return (
    <div className="App">
      <Header />
      <main>
        <Container> {/* center the content */}
          <div className="Search">
            <Menu />
            <Button variant="outline-success" className="rounded my-3" type="button" onClick={findJoke}>Search</Button>
          </div>
          {data.error === false && <Joke category={category} joke={joke}></Joke>}
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
