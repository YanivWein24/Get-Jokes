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
                    This generator contains over 1000 jokes in 6 different languages!<br />
                    Register now for free and create your own joke collection!
                </p>

                <h2>On the technical side:</h2>
                <p>This is a full stack web application, built using the <a href="https://www.geeksforgeeks.org/mern-stack/" className="about-links">"MERN"</a> Stack. </p>
                <p><span className="clientSide">The client side</span> is handled with <a href="https://reactjs.org/" className="about-links">React</a> and <a href="https://getbootstrap.com/" className="about-links">Bootstrap</a>.<br />
                    We handle client side http requests with <a href="https://www.npmjs.com/package/axios" className="about-links">Axios</a>.<br />
                    Each and every parameter in the Menu section has its own <a href="https://reactjs.org/docs/hooks-state.html" className="about-links">UseState Hook</a>,<br />
                    and we manipulate the request to JokeAPI according to those hooks states.<br />
                    We use <a href="https://www.w3schools.com/jsref/prop_win_localstorage.asp" className="about-links">localStorage</a> and the <a href="https://reactjs.org/docs/hooks-effect.html" className="about-links">UseEffect hook</a> to memorize the<br />last theme that was used on a user's device.<br />
                    Routing and screens rending is implemented using <a href="https://reactrouter.com/" className="about-links">React router v6</a>.</p>
                <p>
                    <span className="serverSide">The server side</span> is handled with <a href="https://expressjs.com/" className="about-links">Express</a> and running on a <a href="https://nodejs.org/" className="about-links">Node.js</a> server.<br />
                    User authentication and sessions are handled with <a href="https://www.passportjs.org/" className="about-links">Passport.js</a>, and <a href="https://www.passportjs.org/packages/passport-google-oauth20/" className="about-links">Oauth</a>.<br />
                    Passwords are being hashed and salted using <a href="https://www.npmjs.com/package/bcrypt" className="about-links">Bcrypt</a>.<br />
                    All the user data is being stored in A <a href="https://mongodb.com" className="about-links">MongoDB</a> Database.
                </p>
                <p>The jokes are coming from <a href="http://sv443.net/jokeapi/v2/" className="about-links">Joke-API</a> all rights reserved.</p>
                <span>Made with <span>❤</span> by Yaniv Weinshtein </span>
            </div>
        </Container>
    )
}

export default About