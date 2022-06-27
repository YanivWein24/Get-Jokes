import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import axios from 'axios'


const Joke = ({ category, joke, isLightTheme, addToLikes, userData }) => {
    const [like, setLike] = useState(false)

    const addedLikeMessage = () => {
        setLike(true)
        setTimeout(() => {
            setLike(false)
            window.location.reload()
        }, 1000)
    }
    return (
        <div className="joke fade-in">
            <div className="jokeCategory">Category: {category}</div>
            <div>{joke}</div>
            {userData.email !== "" && userData.email !== undefined &&
                <Button className="likeButton my-1 btn-sm" onClick={async () => { await addToLikes(); addedLikeMessage() }} variant={isLightTheme ? "secondary" : "info"}><i className="fa-solid fa-heart"></i> Like</Button>
            }
            {userData.email !== "" && like === true &&
                <p className="likeMessage fade-in">Added to the collection!</p>
            }
        </div >
    )
}

const TwoPartJoke = ({ category, setup, delivery, isLightTheme, addToLikes, userData }) => {
    const [like, setLike] = useState(false)
    const addedLikeMessage = () => {
        setLike(true)
        setTimeout(() => {
            setLike(false)
            window.location.reload()
        }, 1000)
    }
    return (
        <div className="joke fade-in">
            <div className="jokeCategory underline">Category: {category}</div>
            <div> {setup}</div>
            <div> {delivery}</div>
            {userData.email !== "" && userData.email !== undefined &&
                <Button className="likeButton my-2 btn-sm" onClick={async () => { await addToLikes(); addedLikeMessage() }} variant={isLightTheme ? "secondary" : "info"}><i className="fa-solid fa-heart"></i> Like</Button>
            }
            {userData.email !== "" && like === true &&
                <p className="likeMessage fade-in" >Added to the collection!</p>
            }
        </div >
    )
}

const UserJoke = ({ category, joke, isLightTheme, index }) => {
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
            window.location.reload()
        }, 1000)
    }
    return (
        <div className="joke fade-in">
            <div className="jokeCategory"> {category}</div>
            <div>{joke}</div>
            <Button onClick={() => { deleteJoke(); deleteJokeMessage() }}
                className="btn-sm deleteJokeButton" variant={isLightTheme ? "secondary" : "info"}
                style={{ margin: "1.5rem auto 0" }}>
                <i className="fa-solid fa-trash-can"></i> Delete</Button>
            {deleteMessage === true &&
                <p className="deleteMessage fade-in" >Joke Deleted</p>
            }
            <p style={{ fontSize: "1rem", margin: ".5rem auto 0" }}>{index + 1}</p>
        </div>
    )
}

const TwoPartUserJoke = ({ category, setup, delivery, isLightTheme, index }) => {
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
            window.location.reload()
        }, 1000)
    }

    return (
        <div className="joke fade-in">
            <div className="jokeCategory"> {category}</div>
            <div>{setup}</div>
            <div>{delivery}</div>
            <Button onClick={() => { deleteJoke(); deleteJokeMessage() }}
                className="btn-sm deleteJokeButton" variant={isLightTheme ? "secondary" : "info"}
                style={{ margin: "1.5rem auto 0" }}>
                <i className="fa-solid fa-trash-can"></i> Delete</Button>
            {deleteMessage === true &&
                <p className="deleteMessage fade-in" >Joke Deleted</p>
            }
            <p style={{ fontSize: "1rem", margin: ".5rem auto 0" }}>{index + 1}</p>
        </div>
    )
}

const EmptyUserJoke = ({ category, joke, isLightTheme }) => {
    return (
        <Container className="joke fade-in">
            <div className="jokeCategory"> {category}</div>
            <div>{joke}</div>
        </Container>
    )
}

export default Joke
export { TwoPartJoke, UserJoke, EmptyUserJoke, TwoPartUserJoke }