import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import axios from 'axios'

function Logout({ userData, theme }) {

    // check the current theme to apply different bootstrap button colors
    const isLightTheme = theme === 'light'

    useEffect(() => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "/Logout"
        })
            .then(() => { userData.id && window.location.reload(false) })
            // reload the page after logging out. (executes ONLY when the user is still logged in, to prevent infinite loop)
            .catch((err) => console.log(err))
    }, []);

    return (
        <center className="fade-in">
            {userData.id && <h1>processing...</h1>}

            {!userData.id && <h1>You are now logged out.</h1>}
            {!userData.id && <h1>Press this button to return to the home page</h1>}
            {!userData.id && <Link to="/"><Button className="my-3 returnHomeButton" variant={isLightTheme ? "success" : "info"}>Home Page</Button></Link>}

        </center>
    )
}

export default Logout