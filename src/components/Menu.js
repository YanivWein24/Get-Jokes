import { type } from '@testing-library/user-event/dist/type'
import React, { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'

const reRender = () => {
    // console.log("aasd")
}

const Menu = (props) => {

    // categories:
    const [any, setAny] = useState(true)
    const [dark, setDark] = useState(false)
    const [misc, setMisc] = useState(false)
    const [programming, setProgramming] = useState(false)
    const [pun, setPun] = useState(false)
    const [spooky, setSpooky] = useState(false)
    const [christmas, setChristmas] = useState(false)


    const [single, setSingle] = useState(true)
    const [twoPart, setTwoPart] = useState(true)
    const jokeType = (single && twoPart ? "" : (single ? "&type=Single" : "&type=TwoPart"))
    const [searchString, setSearchString] = useState("")

    const category = any ? "/Any" : `/${programming ? "Programming" : ""}${misc ? "Miscellaneous" : ""}${dark ? "Dark" : ""}${pun ? "Pun" : ""}${spooky ? "Spooky" : ""}${christmas ? "Christmas" : ""}`

    const url = `https://v2.jokeapi.dev/joke${category}?blacklistFlags=${jokeType}&contains=${searchString}`

    const anyCategory = (event) => {
        // console.log(event.target)
        // console.log(event.target.value)
        setAny(true)
        setDark(false)
        setMisc(false)
        setProgramming(false)
        setPun(false)
        setSpooky(false)
        setChristmas(false)
    }

    const sendUrl = () => {
        props.getUrl(url)
    }
    sendUrl()
    // call the function to actually send the url to App.js

    // const [categories, setCategories] = useState([])
    // const changeCategories = (event) => {
    //     setCategories((prevCategories)) console.log(e.target.checked)
    // }

    const searchJoke = (event) => {
        // call the findJoke method only if the user presses "Enter" on the search field, or if the user presses the search button
        if (event.key === 'Enter' || event.target.type === 'button') {
            props.findJoke(url)
            setSearchString("")
        }
    }

    return (
        <div>
            <h1>What kind of joke are you looking for?</h1>
            <Row>
                <Col md={6} sm={12} className="headers">
                    Select Category / Categories: <br />
                    (All categories are applied by default)


                </Col>
                <Col>
                    <Row>
                        <input type="radio" name="catSelect" value="any" id="cat-radio1" checked={any} onChange={anyCategory} />
                        <label value="any" onClick={anyCategory}>Any</label>
                    </Row>
                    <Row>
                        <span id="catSelectMulti">
                            <Row>
                                {/* <input type="checkbox" id="cat-cb3" value={dark} onChange={e => { setAny(false); props.displayCategory(e) }} /><label for="cat-cb3">Dark</label> */}
                                <input type="checkbox" id="cat-cb3" value={dark} checked={dark} onChange={
                                    () => { setAny(false); setDark(!dark) }} /><label for="cat-cb3">Dark</label>
                                <input type="checkbox" id="cat-cb2" value={misc} checked={misc} onChange={
                                    () => { setAny(false); setMisc(!misc) }} /><label for="cat-cb2">Misc</label>
                                <input type="checkbox" id="cat-cb1" value={programming} checked={programming} onChange={() => { setAny(false); setProgramming(!programming) }} /><label for="cat-cb1">Programming</label>
                            </Row>
                            <Row>
                                <input type="checkbox" id="cat-cb4" value={pun} checked={pun} onChange={
                                    () => { setAny(false); setPun(!pun) }} /><label for="cat-cb4">Pun</label>
                                <input type="checkbox" id="cat-cb5" value={spooky} checked={spooky} onChange={
                                    () => { setAny(false); setSpooky(!spooky) }} /><label for="cat-cb5">Spooky</label>
                                <input type="checkbox" id="cat-cb6" value={christmas} checked={christmas} onChange={
                                    () => { setAny(false); setChristmas(!christmas) }} /><label for="cat-cb6">Christmas</label>
                            </Row>
                        </span>
                    </Row>

                </Col>
            </Row>
            <hr />
            <Row>
                <Col md={6} sm={12} className="headers">
                    Select flags to blacklist (optional):
                </Col>
                <Col >
                    <Row>
                        <input type="checkbox" id="blf-cb1" onChange={reRender()} />
                        <label for="blf-cb1">nsfw</label>
                        <input type="checkbox" id="blf-cb2" onChange={reRender()} />
                        <label for="blf-cb2">religious</label>
                        <input type="checkbox" id="blf-cb3" onChange={reRender()} />
                        <label for="blf-cb3">political</label>
                    </Row>
                    <Row>
                        <input type="checkbox" id="blf-cb4" onChange={reRender()} />
                        <label for="blf-cb4">racist</label>
                        <input type="checkbox" id="blf-cb5" onChange={reRender()} />
                        <label for="blf-cb5">sexist</label>
                        <input type="checkbox" id="blf-cb6" onChange={reRender()} />
                        <label for="blf-cb6">explicit</label>
                    </Row>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col md={6} sm={12} className="headers">
                    Search for a joke that
                    contains this search string:
                </Col>
                <Col>
                    <input type="text" className="searchString" placeholder="(optional)" onKeyPress={searchJoke}
                        value={searchString} onChange={(e) => setSearchString(e.target.value)} /><label></label>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col md={6} sm={12} className="headers">
                    Select at least one joke type:
                </Col>
                <Col>
                    <input type="checkbox" id="single" value={single} checked={single} onChange={
                        () => { setSingle(!single); }} /><label for="single">Single Part</label>
                    <input type="checkbox" id="twoPart" value={twoPart} checked={twoPart} onChange={
                        () => { setTwoPart(!twoPart); }} /><label for="twoPart">Two Part</label>
                </Col>
            </Row>
            <Button variant="outline-success" className="rounded my-3" type="button" onClick={searchJoke}>Search</Button>

        </div>
    )
}

export default Menu