import React from 'react';
import axios from 'axios';
import { Container } from "react-bootstrap"
import Header from "./components/Header"
import Footer from "./components/Footer"


function App() {
  const url = `https://v2.jokeapi.dev/joke/Any`

  axios.get(url).then((response) => {
    console.log(response)

  })

  return (
    <div className="App">
      <Header />
      <main>
        <Container> {/* center the content */}
          <h1>hello</h1>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
