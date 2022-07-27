import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import jokeMessageAction from '../actions/jokeMessageAction'

const Joke = ({ category, joke, addToLikes }) => {

    const userDataState = useSelector(state => state.userData)
    const jokeMessage = useSelector(state => state.jokeMessage)
    const dispatch = useDispatch()


    const addedLikeMessage = () => {
        dispatch(jokeMessageAction("toggleMessage"))
        setTimeout(() => {
            dispatch(jokeMessageAction("toggleMessage"))
            window.location.reload()
        }, 1000);
    }
    return (
        <div className="joke fade-in">
            <div className="jokeCategory">Category: {category}</div>
            <div>{joke}</div>
            {userDataState._id !== "" && userDataState._id !== undefined &&
                <Button className="likeButton my-1 btn-sm" onClick={async () => { await addToLikes(); addedLikeMessage() }} variant={"secondary"}><i className="fa-solid fa-heart"></i> Like</Button>
            }
            {userDataState._id !== "" && jokeMessage === true &&
                <p className="likeMessage fade-in">Added to the collection!</p>
            }
        </div >
    )
}


const TwoPartJoke = ({ category, setup, delivery, addToLikes }) => {
    const userDataState = useSelector(state => state.userData)
    const jokeMessage = useSelector(state => state.jokeMessage)
    const dispatch = useDispatch()

    const addedLikeMessage = () => {
        dispatch(jokeMessageAction("toggleMessage"))
        setTimeout(() => {
            dispatch(jokeMessageAction("toggleMessage"))
            window.location.reload()
        }, 1000)
    }
    return (
        <div className="joke fade-in">
            <div className="jokeCategory underline">Category: {category}</div>
            <div> {setup}</div>
            <div> {delivery}</div>
            {userDataState._id !== "" && userDataState._id !== undefined &&
                <Button className="likeButton my-2 btn-sm" onClick={async () => { await addToLikes(); addedLikeMessage() }} variant={"secondary"}><i className="fa-solid fa-heart"></i> Like</Button>
            }
            {userDataState._id !== "" && jokeMessage === true &&
                <p className="likeMessage fade-in" >Added to the collection!</p>
            }
        </div >
    )
}

const UserJoke = ({ joke, index }) => {
    const deleteJoke = async () => {
        await axios({
            method: 'post',
            url: '/user/delete',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                joke: joke.joke
            }
        })
    }

    const [jokeMessage, setJokeMessage] = useState(false)

    const deleteJokeMessage = () => {
        setJokeMessage(true)
        setTimeout(() => {
            setJokeMessage(false)
            window.location.reload()
        }, 1000)
    }
    return (
        <div className="joke fade-in">
            <div className="jokeCategory"> {joke.category}</div>
            <div>{joke.joke}</div>
            <Button onClick={() => { deleteJoke(); deleteJokeMessage() }}
                className="btn-sm deleteJokeButton" variant={"secondary"}>
                <i className="fa-solid fa-trash-can"></i> Delete</Button>
            {jokeMessage === true &&
                <p className="deleteMessage fade-in" >Joke Deleted</p>
            }
            <p className="jokeIndex">{index + 1}</p>
        </div>
    )
}

const TwoPartUserJoke = ({ joke, index }) => {
    const deleteJoke = async () => {
        await axios({
            method: 'post',
            url: '/user/delete',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                setup: joke.setup
            }
        })
    }

    const [jokeMessage, setJokeMessage] = useState(false)

    const deleteJokeMessage = () => {
        setJokeMessage(true)
        setTimeout(() => {
            setJokeMessage(false)
            window.location.reload()
        }, 1000)
    }

    return (
        <div className="joke fade-in">
            <div className="jokeCategory"> {joke.category}</div>
            <div>{joke.setup}</div>
            <div>{joke.delivery}</div>
            <Button onClick={() => { deleteJoke(); deleteJokeMessage() }}
                className="btn-sm deleteJokeButton" variant={"secondary"}>
                <i className="fa-solid fa-trash-can"></i> Delete</Button>
            {jokeMessage === true &&
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