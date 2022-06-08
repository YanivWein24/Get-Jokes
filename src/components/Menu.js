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
    const category = any ? "Any" : `${programming ? "Programming" : ""}${misc ? "Miscellaneous" : ""}${dark ? "Dark" : ""}${pun ? "Pun" : ""}${spooky ? "Spooky" : ""}${christmas ? "Christmas" : ""}`

    // BlackList Flags:
    const [nsfw, setNsfw] = useState(false)
    const [religious, setReligious] = useState(false)
    const [political, setPolitical] = useState(false)
    const [racist, setRacist] = useState(false)
    const [sexist, setSexist] = useState(false)
    const [explicit, setExplicit] = useState(false)
    const blackList = `${nsfw ? "nsfw" : ""}${religious ? "religious" : ""}${political ? "political" : ""}${racist ? "racist" : ""}${sexist ? "sexist" : ""}${explicit ? "explicit" : ""}`

    const [searchString, setSearchString] = useState("")

    const [single, setSingle] = useState(true)
    const [twoPart, setTwoPart] = useState(true)
    const jokeType = (single && twoPart ? "" : (single ? "&type=Single" : "&type=TwoPart"))


    const url = `https://v2.jokeapi.dev/joke/${category}?blacklistFlags=${blackList}${jokeType}&contains=${searchString}`

    const anyCategory = (event) => {
        // console.log(event.target)
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
                    Select A Category:
                </Col>
                <Col>
                    <Row>
                        <input type="radio" name="catSelect" value="any" id="cat-radio1" checked={any} onChange={anyCategory} />
                        <label value="any" onClick={anyCategory}>Any</label>
                    </Row>
                    <Row>
                        <span id="catSelectMulti">
                            <Row>
                                <input type="checkbox" id="Dark" value={dark} checked={dark} onChange={
                                    () => { setAny(false); setDark(!dark) }} /><label for="Dark">Dark</label>
                                <input type="checkbox" id="Misc" value={misc} checked={misc} onChange={
                                    () => { setAny(false); setMisc(!misc) }} /><label for="Misc">Misc</label>
                                <input type="checkbox" id="Programming" value={programming} checked={programming} onChange={() => { setAny(false); setProgramming(!programming) }} />
                                <label for="Programming">Programming</label>
                            </Row>
                            <Row>
                                <input type="checkbox" id="Pun" value={pun} checked={pun} onChange={
                                    () => { setAny(false); setPun(!pun) }} /><label for="Pun">Pun</label>
                                <input type="checkbox" id="Spooky" value={spooky} checked={spooky} onChange={
                                    () => { setAny(false); setSpooky(!spooky) }} /><label for="Spooky">Spooky</label>
                                <input type="checkbox" id="Christmas" value={christmas} checked={christmas} onChange={
                                    () => { setAny(false); setChristmas(!christmas) }} /><label for="Christmas">Christmas</label>
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
                        <input type="checkbox" id="nsfw" value={nsfw} checked={nsfw} onChange={() => setNsfw(!nsfw)} />
                        <label for="nsfw">NSFW</label>
                        <input type="checkbox" id="religious" value={religious} checked={religious} onChange={() => setReligious(!religious)} />
                        <label for="religious">Religious</label>
                        <input type="checkbox" id="political" value={political} checked={political} onChange={() => setPolitical(!political)} />
                        <label for="political">Political</label>
                    </Row>
                    <Row>
                        <input type="checkbox" id="racist" value={racist} checked={racist} onChange={() => setRacist(!racist)} />
                        <label for="racist">Racist</label>
                        <input type="checkbox" id="sexist" value={sexist} checked={sexist} onChange={() => setSexist(!sexist)} />
                        <label for="sexist">Sexist</label>
                        <input type="checkbox" id="explicit" value={explicit} checked={explicit} onChange={() => setExplicit(!explicit)} />
                        <label for="explicit">Explicit</label>
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