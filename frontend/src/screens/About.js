import React from 'react'
import { Container } from "react-bootstrap"

const About = () => {
    return (
        <Container>
            <div className="about joke fade-in">
                <h1>About this project:</h1>
                <p>This is a joke Generator web app!</p>
                <p>Access a huge database and explore exclusive jokes, ordered by categories and blacklists.<br />
                    Make it even better by searching for jokes that include specific words you desire!<br />
                    This generator contains over 1000 jokes in 6 different languages!</p>

                <h2>On the technical side:</h2>
                <p>This is a front-end project, and its built mainly using <a href="https://reactjs.org/" className="about-links">React</a> and <a href="https://getbootstrap.com/" className="about-links">Bootstrap</a>. </p>
                <p>We use <a href="https://www.npmjs.com/package/axios" className="about-links">Axios</a> to send HTTP requests to the API, sending all the queries from the user.</p>
                <p>Each and every parameter in the Menu section has its own <a href="https://reactjs.org/docs/hooks-state.html" className="about-links">UseState Hook</a>, and we manipulate the API request according to those hooks states.</p>
                <p><a href="https://reactrouter.com/" className="about-links">React router v6</a> is implemented here in order to render both the Home and About Screens. </p>
                <p>The jokes are coming from <a href="http://sv443.net/jokeapi/v2/" className="about-links">Joke-API</a> all rights reserved.</p>
                <span>Made with <span>❤</span> by Yaniv Weinshtein </span>
            </div>
        </Container>
    )
}

export default About