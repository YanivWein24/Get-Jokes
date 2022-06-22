import React from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'


const Joke = ({ category, joke, isLightTheme, addToLikes, userData }) => {
    return (
        <div className="joke fade-in">
            <div className="jokeCategory">Category: {category}</div>
            <div>{joke}</div>
            {userData.email !== "" &&
                <Button className="likeButton my-1 btn-sm" onClick={addToLikes} variant={isLightTheme ? "secondary" : "info"}><i class="fa-solid fa-heart"></i> Like</Button>
            }
        </div>
    )
}

const TwoPartJoke = ({ category, setup, delivery, isLightTheme, addToLikes, userData }) => {
    return (
        <div className="joke fade-in">
            <div className="jokeCategory underline">Category: {category}</div>
            <div> {setup}</div>
            <div> {delivery}</div>
            {userData.email !== "" &&
                <Button className="likeButton my-2 rounded btn-sm" onClick={addToLikes} variant={isLightTheme ? "secondary" : "info"}><i class="fa-solid fa-heart"></i> Like</Button>
            }
        </div>
    )
}

const UserJoke = ({ jokeId, category, joke, isLightTheme, userData, setUserData }) => {
    const deleteJoke = async (jokeId) => {
        // axios.post(`/user/delete`, null, {
        //     params: {
        //         id: jokeId,
        //     }
        // })
        //     .then(console.log("Sent post request to delete joke"))
        // .then(setUserData(userData.jokes.filter(joke => joke._id !== "62b30c898a2b4cd67554a67f")))
        await axios({
            method: 'post',
            url: '/user/delete',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                id: jokeId
            }
        })
    }
    return (
        <div className="joke fade-in">
            <div className="jokeCategory"> {category}</div>
            <div>{joke}</div>
            <Button onClick={() => deleteJoke(jokeId)} className="my-1 btn-sm" variant={isLightTheme ? "secondary" : "info"}><i class="fa-solid fa-trash-can"></i> Delete</Button>
        </div>
    )
}


const TwoPartUserJoke = ({ jokeId, category, setup, delivery, isLightTheme }) => {
    return (
        <div className="joke fade-in">
            <div className="jokeCategory"> {category}</div>
            <div>{setup}</div>
            <div>{delivery}</div>
            <Button className="my-1 btn-sm" variant={isLightTheme ? "secondary" : "info"}><i class="fa-solid fa-trash-can"></i> Delete</Button>
        </div>
    )
}

const EmptyUserJoke = ({ category, joke, isLightTheme }) => {
    return (
        <div className="joke fade-in">
            <div className="jokeCategory"> {category}</div>
            <div>{joke}</div>
        </div>
    )
}

export default Joke
export { TwoPartJoke, UserJoke, EmptyUserJoke, TwoPartUserJoke }