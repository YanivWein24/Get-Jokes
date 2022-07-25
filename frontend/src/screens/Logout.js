import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { ThemeContext } from "../App"
import { useSelector } from 'react-redux'

function Logout() {
    const userData = useSelector(state => state.userData)

    const { isLightTheme } = useContext(ThemeContext)

    useEffect(() => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "/logout"
        })
            .then(() => { userData._id && window.location.reload(false) })
            // reload the page after logging out. (executes ONLY when the user is still logged in, to prevent infinite loop)
            .catch((err) => console.log(err))
    }, []);

    return (
        <center className="fade-in">
            {userData.id ? <h1 className="processing">processing...</h1>
                :
                <>
                    {/* appears only in development. in production the user will get redirected to the root route*/}
                    <h1 className="loggedOutMessage">You are now logged out</h1>
                    <h1 className="redirectMessage">Press this button to return to the home page</h1>
                    <Link to="/"><Button className=" returnHomeButton" variant={isLightTheme ? "success" : "info"}>Home Page</Button></Link>
                </>
            }
        </center>
    )
}

export default Logout