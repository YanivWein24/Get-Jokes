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
            url: "/logout"
        })
            .then(() => { userData.id && window.location.reload(false) })
            // reload the page after logging out. (executes ONLY when the user is still logged in, to prevent infinite loop)
            .catch((err) => console.log(err))
    }, []);

    return (
        <center className="fade-in">
            {userData.id ? <h1 style={{ marginTop: "2rem" }}>processing...</h1>
                :
                <>
                    {/* appears only in development. in production the user will get redirected to the root route*/}
                    <h1 style={{ marginTop: "2rem", fontSize: "1.5rem" }}>You are now logged out</h1>
                    <h1 style={{ fontSize: "1.2rem" }}>Press this button to return to the home page</h1>
                    <Link to="/"><Button className=" returnHomeButton" variant={isLightTheme ? "success" : "info"}>Home Page</Button></Link>
                </>
            }


        </center>
    )
}

export default Logout