import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'


const Joke = ({ category, joke, isLightTheme, addToLikes, getUserData, userData }) => {
    const [like, setLike] = useState(false)

    const addedLikeMessage = () => {
        setLike(true)
        setTimeout(() => {
            setLike(false)
        }, 2000);
    }
    return (
        <div className="joke fade-in">
            <div className="jokeCategory">Category: {category}</div>
            <div>{joke}</div>
            {userData.email !== "" &&
                <Button className="likeButton my-1 btn-sm" onClick={() => { addToLikes(); getUserData(); addedLikeMessage() }} variant={isLightTheme ? "secondary" : "info"}><i className="fa-solid fa-heart"></i> Like</Button>
            }
            {userData.email !== "" && like === true &&
                <p className="likeMessage fade-in">Added to the collection!</p>
            }
        </div >
    )
}

const TwoPartJoke = ({ category, setup, delivery, isLightTheme, addToLikes, getUserData, userData }) => {
    const [like, setLike] = useState(false)
    const addedLikeMessage = () => {
        setLike(true)
        setTimeout(() => {
            setLike(false)
        }, 2000);
    }
    return (
        <div className="joke fade-in">
            <div className="jokeCategory underline">Category: {category}</div>
            <div> {setup}</div>
            <div> {delivery}</div>
            {userData.email !== "" &&
                <Button className="likeButton my-2 btn-sm" onClick={() => { addToLikes(); getUserData(); addedLikeMessage() }} variant={isLightTheme ? "secondary" : "info"}><i className="fa-solid fa-heart"></i> Like</Button>
            }
            {userData.email !== "" && like === true &&
                <p className="likeMessage fade-in" >Added to the collection!</p>
            }
        </div >
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
    const [deleteMessage, setDeleteMessage] = useState(false)
    const deleteJokeMessage = () => {
        setDeleteMessage(true)
        setTimeout(() => {
            setDeleteMessage(false)
        }, 2000);
    }
    return (
        <div className="joke fade-in">
            <div className="jokeCategory"> {category}</div>
            <div>{joke}</div>
            <Button onClick={() => { deleteJoke(); deleteJokeMessage() }} className="my-1 btn-sm deleteJokeButton" variant={isLightTheme ? "secondary" : "info"}><i className="fa-solid fa-trash-can"></i> Delete</Button>
            {deleteMessage === true &&
                <p className="deleteMessage fade-in" >Joke Deleted</p>
            }
        </div>
    )
}

const TwoPartUserJoke = ({ category, setup, delivery, isLightTheme }) => {
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

    const [deleteMessage, setDeleteMessage] = useState(false)

    const deleteJokeMessage = () => {
        setDeleteMessage(true)
        setTimeout(() => {
            setDeleteMessage(false)
        }, 2000);
    }

    return (
        <div className="joke fade-in">
            <div className="jokeCategory"> {category}</div>
            <div>{setup}</div>
            <div>{delivery}</div>
            <Button onClick={() => { deleteJoke(); deleteJokeMessage() }} className="my-1 btn-sm deleteJokeButton" variant={isLightTheme ? "secondary" : "info"}><i className="fa-solid fa-trash-can"></i> Delete</Button>
            {deleteMessage === true &&
                <p className="deleteMessage fade-in" >Joke Deleted</p>
            }
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