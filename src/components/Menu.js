import React, { useState, useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap'

const Menu = (props) => {

    // check the current theme to apply different bootstrap button colors
    const isLightTheme = props.theme === 'light'

    // Categories:
    const [any, setAny] = useState(true)
    const [dark, setDark] = useState(false)
    const [misc, setMisc] = useState(false)
    const [programming, setProgramming] = useState(false)
    const [pun, setPun] = useState(false)
    const [spooky, setSpooky] = useState(false)
    const [christmas, setChristmas] = useState(false)

    // BlackList Flags:
    const [nsfw, setNsfw] = useState(false)
    const [religious, setReligious] = useState(false)
    const [political, setPolitical] = useState(false)
    const [racist, setRacist] = useState(false)
    const [sexist, setSexist] = useState(false)
    const [explicit, setExplicit] = useState(false)

    // Picked Language 
    const [language, setLanguage] = useState("")
    const pickedLanguage = language !== "" ? `?lang=${language}` : ""

    // Arrays of categories and blacklists flags
    const [categories, setCategories] = useState([])
    const [blackList, setBlackList] = useState([])
    // Joke Format
    const [single, setSingle] = useState(true)
    const [twoPart, setTwoPart] = useState(true)
    const jokeType = (single && twoPart ? "" : (single ? (blackList[0] === undefined && language === "" ? "?type=Single" : "&type=Single") : (blackList[0] === undefined && language === "" ? "?type=TwoPart" : "&type=TwoPart")))

    // Search Joke String
    const [searchString, setSearchString] = useState("")
    const searchStringFormatted = searchString && (blackList[0] === undefined && jokeType === "" && language === "" ? `?contains=${searchString}` : `&contains=${searchString}`)
    // if the users apply blackList flags or change the joke type, then instead of "?contains=" we will need to use "&contains="

    // Add / Remove a category from the array, depending whether the checkbox is being checked
    const handleCategoryChange = (event) => {
        const { id, checked } = event.target
        // we could also use the property "value" instead of "checked", but it returns "true"/"false" as strings
        if (checked) {
            setAny(false)
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

    // whenever the categories array is empty, we set "Any" to true.
    // if we try to do the same thing inside "handleCategoryChange" method, this wont work,
    // and we will end up using an outdated value of the categories array 
    useEffect(() => {
        categories[0] === undefined && setAny(true)
    }, [categories])

    // Create a valid string from the "categories" array to be used in the url 
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

    // Add / Remove a blacklist flag from the array 
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

    // Create a valid string from the "blackList" array to be used in the url 
    const blackListString = () => {
        let flags = ""
        blackList.forEach((flag, index) => {
            if (flag === blackList[0]) {
                (language === "" ? flags += `?blacklistFlags=${flag}` : flags += `&blacklistFlags=${flag}`)
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
    const url = `https://v2.jokeapi.dev/joke${category}${pickedLanguage}${blackListFlags}${jokeType}${searchStringFormatted}`

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
        props.setData({}) // setting data to {} - removes the joke being displayed
        anyCategory() // this method resets all the categories
        setLanguage("")
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
                <Col md={6} sm={12} className="options">
                    Select A Category:
                </Col>
                <Col>
                    <Row>
                        <input type="checkbox" name="catSelect" value="any" checked={any} onChange={anyCategory} />
                        <label value="any" onClick={anyCategory}>Any</label>
                    </Row>
                    <Row>
                        <span>
                            <Row className="catSelectMulti">
                                <input type="checkbox" id="Dark" value={dark} checked={dark} onChange={
                                    (e) => { setDark(!dark); handleCategoryChange(e) }} /><label htmlFor="Dark">Dark</label>
                                <input type="checkbox" id="Pun" value={pun} checked={pun} onChange={
                                    (e) => { setPun(!pun); handleCategoryChange(e) }} /><label htmlFor="Pun">Pun</label>

                                <input type="checkbox" id="Programming" value={programming} checked={programming} onChange={
                                    (e) => { setProgramming(!programming); handleCategoryChange(e) }
                                } />
                                <label htmlFor="Programming">Programming</label>
                            </Row>
                            <Row className="catSelectMulti">
                                <input type="checkbox" id="Misc" value={misc} checked={misc} onChange={
                                    (e) => { setMisc(!misc); handleCategoryChange(e) }} /><label htmlFor="Misc">Misc</label>
                                <input type="checkbox" id="Spooky" value={spooky} checked={spooky} onChange={
                                    (e) => { setSpooky(!spooky); handleCategoryChange(e) }} /><label htmlFor="Spooky">Spooky</label>
                                <input type="checkbox" id="Christmas" value={christmas} checked={christmas} onChange={
                                    (e) => { setChristmas(!christmas); handleCategoryChange(e) }} /><label htmlFor="Christmas">Christmas</label>
                            </Row>
                        </span>
                    </Row>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col md={6} sm={12} className="options">Select Language</Col>
                <Col>
                    <select name="Language" value={language} onChange={(e) => setLanguage(e.target.value)}>
                        <option value="">English</option>
                        <option value="cs">Czech</option>
                        <option value="de">German</option>
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
                        <option value="pt">Portuguese</option>
                    </select>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col md={6} sm={12} className="options">
                    Select flags to blacklist (optional):
                </Col>
                <Col >
                    <Row>
                        <input type="checkbox" id="nsfw" value={nsfw} checked={nsfw} onChange={
                            (e) => { setNsfw(!nsfw); handleBlackListChange(e) }} />
                        <label htmlFor="nsfw">NSFW</label>
                        <input type="checkbox" id="religious" value={religious} checked={religious} onChange={
                            (e) => { setReligious(!religious); handleBlackListChange(e) }} />
                        <label htmlFor="religious">Religious</label>
                        <input type="checkbox" id="political" value={political} checked={political} onChange={
                            (e) => { setPolitical(!political); handleBlackListChange(e) }} />
                        <label htmlFor="political">Political</label>
                    </Row>
                    <Row>
                        <input type="checkbox" id="racist" value={racist} checked={racist} onChange={
                            (e) => { setRacist(!racist); handleBlackListChange(e) }} />
                        <label htmlFor="racist">Racist</label>
                        <input type="checkbox" id="sexist" value={sexist} checked={sexist} onChange={
                            (e) => { setSexist(!sexist); handleBlackListChange(e) }} />
                        <label htmlFor="sexist">Sexist</label>
                        <input type="checkbox" id="explicit" value={explicit} checked={explicit} onChange={
                            (e) => { setExplicit(!explicit); handleBlackListChange(e) }} />
                        <label htmlFor="explicit">Explicit</label>
                    </Row>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col md={6} sm={12} className="options">
                    Search for a joke that
                    contains this string:
                </Col>
                <Col>
                    <input type="text" className="searchString" placeholder="(optional)" onKeyPress={searchJoke}
                        value={searchString} onChange={(e) => setSearchString(e.target.value)} />
                    <Button variant={isLightTheme ? "danger" : "outline-danger"} className="deleteButton" placeholder="Delete" onClick={() => setSearchString("")}>Delete</Button>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col md={6} sm={12} className="options">
                    Select at least one joke type:
                </Col>
                <Col className="jokeType">
                    <input type="checkbox" id="single" value={single} checked={single} onChange={
                        () => { setSingle(!single); }} /><label htmlFor="single">Single Part</label>
                    <input type="checkbox" id="twoPart" value={twoPart} checked={twoPart} onChange={
                        () => { setTwoPart(!twoPart); }} /><label htmlFor="twoPart">Two Part</label>
                </Col>
            </Row>
            <Row className="resetRow">
                <Button variant={isLightTheme ? "outline-success" : "outline-info"} className="resetButton m-auto" onClick={reset}>Reset</Button>
                {/* className => rounded, margin auto */}
            </Row>
            <Button variant={isLightTheme ? "success" : "info"} className="searchButton mx-auto my-2" type="button" onClick={searchJoke}>Search</Button>
            {/* className => rounded, margin auto on x axis, margin 16px on y axis */}
        </div>
    )
}

export default Menu