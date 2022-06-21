import React, { useEffect } from 'react'
import axios from 'axios'

function Logout() {


    useEffect(() => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "/Logout"
        })
            .catch((err) => console.log(err))
    }, []);

    return (
        <h1>processing...</h1>
    )
}

export default Logout