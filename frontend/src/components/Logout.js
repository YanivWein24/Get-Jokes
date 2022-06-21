import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import axios from 'axios'

function Logout({ data }) {

    // const history = useHistory();

    // function handleClick(path) {
    //     history.push(path);
    // }

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
        <>
            {data.id && <h1>processing...</h1>}

            {!data.id && <h2>You are now logged out.</h2>}
            {!data.id && <h2>Press this button to return to the home page</h2>}
            {!data.id && <Link to="/"><Button>Home Page</Button></Link>}

        </>
    )
}

export default Logout