import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Joke = ({ category, joke, addToLikes }) => {

    const [like, setLike] = useState(false)
    const userDataState = useSelector(state => state.userData)
    const theme = useSelector(state => state.theme)
    const isLightTheme = theme === "light"

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
            {userDataState.email !== "" && userDataState.email !== undefined &&
                <Button className="likeButton my-1 btn-sm" onClick={async () => { await addToLikes(); addedLikeMessage() }} variant={isLightTheme ? "secondary" : "info"}><i className="fa-solid fa-heart"></i> Like</Button>
            }
            {userDataState.email !== "" && like === true &&
                <p className="likeMessage fade-in">Added to the collection!</p>
            }
        </div >
    )
}


const TwoPartJoke = ({ category, setup, delivery, addToLikes }) => {
    const [like, setLike] = useState(false)
    const userDataState = useSelector(state => state.userData)
    const theme = useSelector(state => state.theme)
    const isLightTheme = theme === "light"

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
            {userDataState.email !== "" && userDataState.email !== undefined &&
                <Button className="likeButton my-2 btn-sm" onClick={async () => { await addToLikes(); addedLikeMessage() }} variant={isLightTheme ? "secondary" : "info"}><i className="fa-solid fa-heart"></i> Like</Button>
            }
            {userDataState.email !== "" && like === true &&
                <p className="likeMessage fade-in" >Added to the collection!</p>
            }
        </div >
    )
}

const UserJoke = ({ category, joke, index }) => {
    const theme = useSelector(state => state.theme)
    const isLightTheme = theme === "light"
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
                className="btn-sm deleteJokeButton" variant={isLightTheme ? "secondary" : "info"}>
                <i className="fa-solid fa-trash-can"></i> Delete</Button>
            {deleteMessage === true &&
                <p className="deleteMessage fade-in" >Joke Deleted</p>
            }
            <p className="jokeIndex">{index + 1}</p>
        </div>
    )
}

const TwoPartUserJoke = ({ category, setup, delivery, index }) => {
    const theme = useSelector(state => state.theme)
    const isLightTheme = theme === "light"
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
                className="btn-sm deleteJokeButton" variant={isLightTheme ? "secondary" : "info"}>
                <i className="fa-solid fa-trash-can"></i> Delete</Button>
            {deleteMessage === true &&
                <p className="deleteMessage fade-in" >Joke Deleted</p>
            }
            <p className="jokeIndex">{index + 1}</p>
        </div>
    )
}

const EmptyUserJoke = ({ category, joke }) => {
    return (
        <Container className="joke fade-in">
            <div className="jokeCategory"> {category}</div>
            <div>{joke}</div>
        </Container>
    )
}

export default Joke
export { TwoPartJoke, UserJoke, EmptyUserJoke, TwoPartUserJoke }