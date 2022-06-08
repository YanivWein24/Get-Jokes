import React, { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'

const Menu = (props) => {

    // categories:
    const [any, setAny] = useState(true)
    const [dark, setDark] = useState(false)
    const [misc, setMisc] = useState(false)
    const [programming, setProgramming] = useState(false)
    const [pun, setPun] = useState(false)
    const [spooky, setSpooky] = useState(false)
    const [christmas, setChristmas] = useState(false)

    const [categories, setCategories] = useState([])
    const [blackList, setBlackList] = useState([])


    // BlackList Flags:
    const [nsfw, setNsfw] = useState(false)
    const [religious, setReligious] = useState(false)
    const [political, setPolitical] = useState(false)
    const [racist, setRacist] = useState(false)
    const [sexist, setSexist] = useState(false)
    const [explicit, setExplicit] = useState(false)

    const [searchString, setSearchString] = useState("")

    const [single, setSingle] = useState(true)
    const [twoPart, setTwoPart] = useState(true)
    const jokeType = (single && twoPart ? "" : (single ? (blackList[0] === undefined ? "?type=Single" : "&type=Single") : (blackList[0] === undefined ? "?type=TwoPart" : "&type=TwoPart")))

    const handleCategoryChange = (event) => {
        const { id, checked } = event.target
        // we could also use the property "value" instead of "checked", but it returns "true"/"false" as strings
        if (checked) {
            setCategories((prevCategories) => {
                return [...prevCategories, id]

            })
        } else {
            setCategories((prevCategories) => {
                return prevCategories.filter((category) => {
                    return category !== id
                })
            })
        }
    }

    const categoriesString = () => {
        let catString = ""
        categories.forEach((category) => {
            if (category === categories[0]) {
                catString += `/${category}`
            } else {
                catString += `,${category}`
                console.log(categories.length)
            }
        }
        )
        return catString
    }

    const handleBlackListChange = (event) => {
        const { id, checked } = event.target
        // we could also use the property "value" instead of "checked", but it returns "true"/"false" as strings
        if (checked) {
            setBlackList((prevFlags) => {
                return [...prevFlags, id]

            })
        } else {
            setBlackList((prevFlags) => {
                return prevFlags.filter((flag) => {
                    return flag !== id
                })
            })
        }
    }

    const blackListString = () => {
        let flags = ""
        blackList.forEach((flag, index) => {
            if (flag === blackList[0]) {
                flags += `?blacklistFlags=${flag}`
            } else if (flag === blackList[blackList.length]) {
                flags += `${flag}`
            } else {
                flags += `,${flag}`
                console.log(blackList.length)
            }
        }
        )
        return flags
    }

    const blackListFlags = blackListString()
    const category = any ? "/Any" : categoriesString()
    const searchStringFormatted = searchString && (blackList[0] === undefined && jokeType === "" ? `?contains=${searchString}` : `&contains=${searchString}`)
    // if the users apply blackList flags or change the joke type, then instead of "?contains=" we will need to use "&contains="
    const url = `https://v2.jokeapi.dev/joke${category}${blackListFlags}${jokeType}${searchStringFormatted}`

    const anyCategory = () => {
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

    const searchJoke = (event) => {
        // call the findJoke method only if the user presses "Enter" on the search field, or if the user presses the search button
        if (event.key === 'Enter' || event.target.type === 'button') {
            props.findJoke(url)
            // setSearchString("")
        }
    }

    const reset = () => {
        anyCategory() // this method resets all the categories
        setNsfw(false)
        setReligious(false)
        setPolitical(false)
        setRacist(false)
        setSexist(false)
        setExplicit(false)
        setSearchString("")
        setSingle(true)
        setTwoPart(true)
        setBlackList([])
        setCategories([])
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
                        <span>
                            <Row className="catSelectMulti">
                                <input type="checkbox" id="Dark" value={dark} checked={dark} onChange={
                                    async (e) => { await setAny(false); await setDark(!dark); handleCategoryChange(e) }} /><label for="Dark">Dark</label>
                                <input type="checkbox" id="Misc" value={misc} checked={misc} onChange={
                                    async (e) => { await setAny(false); await setMisc(!misc); handleCategoryChange(e) }} /><label for="Misc">Misc</label>
                                <input type="checkbox" id="Programming" value={programming} checked={programming} onChange={
                                    async (e) => { await setAny(false); await setProgramming(!programming); handleCategoryChange(e) }
                                } />
                                <label for="Programming">Programming</label>
                            </Row>
                            <Row className="catSelectMulti">
                                <input type="checkbox" id="Pun" value={pun} checked={pun} onChange={
                                    async (e) => { await setAny(false); await setPun(!pun); handleCategoryChange(e) }} /><label for="Pun">Pun</label>
                                <input type="checkbox" id="Spooky" value={spooky} checked={spooky} onChange={
                                    async (e) => { await setAny(false); await setSpooky(!spooky); handleCategoryChange(e) }} /><label for="Spooky">Spooky</label>
                                <input type="checkbox" id="Christmas" value={christmas} checked={christmas} onChange={
                                    async (e) => { await setAny(false); await setChristmas(!christmas); handleCategoryChange(e) }} /><label for="Christmas">Christmas</label>
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
                        <input type="checkbox" id="nsfw" value={nsfw} checked={nsfw} onChange={
                            async (e) => { await setNsfw(!nsfw); handleBlackListChange(e) }} />
                        <label for="nsfw">NSFW</label>
                        <input type="checkbox" id="religious" value={religious} checked={religious} onChange={
                            async (e) => { await setReligious(!religious); handleBlackListChange(e) }} />
                        <label for="religious">Religious</label>
                        <input type="checkbox" id="political" value={political} checked={political} onChange={
                            async (e) => { await setPolitical(!political); handleBlackListChange(e) }} />
                        <label for="political">Political</label>
                    </Row>
                    <Row>
                        <input type="checkbox" id="racist" value={racist} checked={racist} onChange={
                            async (e) => { await setRacist(!racist); handleBlackListChange(e) }} />
                        <label for="racist">Racist</label>
                        <input type="checkbox" id="sexist" value={sexist} checked={sexist} onChange={
                            async (e) => { await setSexist(!sexist); handleBlackListChange(e) }} />
                        <label for="sexist">Sexist</label>
                        <input type="checkbox" id="explicit" value={explicit} checked={explicit} onChange={
                            async (e) => { await setExplicit(!explicit); handleBlackListChange(e) }} />
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
                        value={searchString} onChange={(e) => setSearchString(e.target.value)} />
                </Col>
            </Row>
            <hr />
            <Row>
                <Col md={6} sm={12} className="headers">
                    Select at least one joke type:
                </Col>
                <Col className="jokeType">
                    <input type="checkbox" id="single" value={single} checked={single} onChange={
                        () => { setSingle(!single); }} /><label for="single">Single Part</label>
                    <input type="checkbox" id="twoPart" value={twoPart} checked={twoPart} onChange={
                        () => { setTwoPart(!twoPart); }} /><label for="twoPart">Two Part</label>
                </Col>
            </Row>
            <Row className="reset">
                <Button variant="outline-success" className="rounded m-auto btn-sm" onClick={reset}>Reset</Button>
                {/* className => rounded, margin auto */}
            </Row>
            <Button variant="success" className="rounded mx-auto my-2" type="button" onClick={searchJoke}>Search</Button>
            {/* className => rounded, margin auto on x axis, margin 16px on y axis */}
        </div>
    )
}

export default Menu