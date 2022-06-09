import React from 'react'
import { Container } from "react-bootstrap"

const About = () => {
    return (
        <Container>
            <div class="about joke fade-in">
                <h1>About this project:</h1>
                <p>This is a joke Generator web app!</p>
                <p>Access a huge database and explore exclusive jokes ordered by categories and blacklists.<br />
                    Make it even better by searching for jokes that include specific words you desire!<br /></p>

                <h2>On the technical side:</h2>
                <p>This is a front-end project, and its built mainly using <span>React</span> and <span>Bootstrap</span>. </p>
                <p>We use <span>Axios</span> to send HTTP requests to the API, sending all the queries from the user.</p>
                <p>Each and every parameter in the Menu section has its own <span>UseState Hook</span>, and we manipulate the API request according to those hooks states.</p>
                <p><span>React router v6</span> is implemented here in order to render both the Home and About Screens. </p>
                <p>The jokes are coming from <a href="http://sv443.net/jokeapi/v2/" className="joke-api">Joke-API</a> all rights reserved.</p>
                <span>Made with <span>❤</span> by Yaniv Weinshtein </span>
            </div>
        </Container>
    )
}

export default About