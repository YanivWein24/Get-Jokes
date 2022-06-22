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

const UserJoke = ({ category, joke, isLightTheme, userData, setUserData }) => {
    const deleteJoke = async () => {
        await axios({
            method: 'post',
            url: '/user/delete',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                joke: joke
            }
        })
    }
    return (
        <div className="joke fade-in">
            <div className="jokeCategory"> {category}</div>
            <div>{joke}</div>
            <Button onClick={() => deleteJoke()} className="my-1 btn-sm" variant={isLightTheme ? "secondary" : "info"}><i class="fa-solid fa-trash-can"></i> Delete</Button>
        </div>
    )
}


const TwoPartUserJoke = ({ jokeId, category, setup, delivery, isLightTheme }) => {
    const deleteJoke = async () => {
        await axios({
            method: 'post',
            url: '/user/delete',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                setup: setup
            }
        })
    }
    return (
        <div className="joke fade-in">
            <div className="jokeCategory"> {category}</div>
            <div>{setup}</div>
            <div>{delivery}</div>
            <Button onClick={() => deleteJoke()} className="my-1 btn-sm" variant={isLightTheme ? "secondary" : "info"}><i class="fa-solid fa-trash-can"></i> Delete</Button>
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