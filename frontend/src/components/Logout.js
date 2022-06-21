import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import axios from 'axios'

function Logout({ data, theme }) {

    // check the current theme to apply different bootstrap button colors
    const isLightTheme = theme === 'light'

    useEffect(() => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "/Logout"
        })
            .then(() => { data.id && window.location.reload(false) })
            // reload the page after logging out. (executes ONLY when the user is still logged in, to prevent infinite loop)
            .catch((err) => console.log(err))
    }, []);

    return (
        <center className="fade-in">
            {data.id && <h1>processing...</h1>}

            {!data.id && <h1>You are now logged out.</h1>}
            {!data.id && <h1>Press this button to return to the home page</h1>}
            {!data.id && <Link to="/"><Button className="my-3" variant={isLightTheme ? "success" : "info"}>Home Page</Button></Link>}

        </center>
    )
}

export default Logout