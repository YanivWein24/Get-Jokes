import React, { useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import categoriesActions, { categoriesListActions } from '../actions/categoriesActions'
import blackListFlagsActions, { blackListActions } from '../actions/blackListActions'
import langSelectAction from '../actions/langSelectAction'
import searchStringActions from '../actions/SearchStringActions'
import jokeTypeActions from '../actions/jokeTypeActions'
import jokeActions from '../actions/jokeActions'


const Menu = ({ getUrl, findJoke }) => {

    const categoriesState = useSelector(state => state.categories)
    const categoriesListState = useSelector(state => state.categoriesList)
    const blackListState = useSelector(state => state.blackList)
    const blackFlagsState = useSelector(state => state.blackFlags)
    const languageState = useSelector(state => state.langSelect)
    const searchStringState = useSelector(state => state.searchString)
    const jokeTypeState = useSelector(state => state.jokeType)
    const dispatch = useDispatch()


    // Joke Format
    const jokeType = (jokeTypeState.singlePart && jokeTypeState.twoPart ? "" : (jokeTypeState.singlePart ? (blackListState[0] === undefined && languageState === "" ? "?type=Single" : "&type=Single") : (blackListState[0] === undefined && languageState === "" ? "?type=TwoPart" : "&type=TwoPart")))

    // Search Joke String
    const searchStringFormatted = searchStringState && (blackListState[0] === undefined && jokeType === "" && languageState === "" ? `?contains=${searchStringState}` : `&contains=${searchStringState}`)
    // if the users apply blackList flags or change the joke type, then instead of "?contains=" we will need to use "&contains="

    // Add / Remove a category from the array, depending whether the checkbox is being checked
    const handleCategoryChange = (event) => {
        const { id, checked } = event.target
        // we could also use the property "value" instead of "checked", but it returns "true"/"false" as strings
        if (checked) {
            categoriesListState[0] === undefined && dispatch(categoriesActions("setAnyFalse"))
            dispatch(categoriesListActions("addCategory", id))
        } else {
            dispatch(categoriesListActions("removeCategory", id))
        }
    }

    useEffect(() => {
        categoriesListState[0] === undefined && dispatch(categoriesActions("setAnyTrue"))
    }, [categoriesListState])

    useEffect(() => {
        ((jokeTypeState.singlePart || jokeTypeState.twoPart) === false) &&
            dispatch(jokeTypeActions("resetJokeType"))
    }, [jokeTypeState])

    // Create a valid string from the "categories" array to be used in the url 
    const categoriesString = () => {
        let catString = ""
        categoriesListState.forEach((category) => {
            if (category === categoriesListState[0]) {
                catString += `/${category}`
            } else {
                catString += `,${category}`
            }
        })
        return catString
    }

    // Add / Remove a blacklist flag from the array 
    const handleBlackListChange = (event) => {
        const { id, checked } = event.target
        // we could also use the property "value" instead of "checked", but it returns "true"/"false" as strings
        if (checked) {
            dispatch(blackListActions("addFlag", id))
        } else {
            dispatch(blackListActions("removeFlag", id))
        }
    }

    // Create a valid string from the "blackList" array to be used in the url 
    const blackListString = () => {
        let flags = ""
        blackListState.forEach((flag) => {
            if (flag === blackListState[0]) {
                (languageState === "" ? flags += `?blacklistFlags=${flag}` : flags += `&blacklistFlags=${flag}`)
            } else if (flag === blackListState[blackListState.length]) {
                flags += `${flag}`
            } else {
                flags += `,${flag}`
            }
        })
        return flags
    }

    const pickedLanguage = languageState !== "" ? `?lang=${languageState}` : ""
    const blackListFlags = blackListString()
    const category = categoriesState.any ? "/Any" : categoriesString()
    const url = `https://v2.jokeapi.dev/joke${category}${pickedLanguage}${blackListFlags}${jokeType}${searchStringFormatted}`

    const sendUrl = () => {
        getUrl(url)
    }

    useEffect(() => {
        sendUrl()
    }, [sendUrl])
    // call the function and send the url whenever the page loads / the url changes

    const searchJoke = (event) => {
        // call the findJoke method only if the user presses "Enter" on the search field, or if the user presses the search button
        if (event.key === 'Enter' || event.target.type === 'button') {
            findJoke(url)
        }
    }

    const reset = () => {
        dispatch(categoriesActions("resetCategories"))
        dispatch(categoriesListActions("removeAllCategories"))
        dispatch(blackListFlagsActions("resetFlags"))
        dispatch(blackListActions("removeAllFlags"))
        dispatch(langSelectAction(""))
        dispatch(jokeTypeActions("resetJokeType"))
        dispatch(searchStringActions("delete"))
        dispatch(jokeActions("resetJoke")) // - removes the joke that is being displayed
    }

    return (
        <div>
            <h1>What kind of joke are you looking for?</h1>
            <Row>
                <Col md={6} sm={12} className="options">
                    Select A Category:
                </Col>
                <Col>
                    <Row >
                        <div className="anyCatButton" style={{ "border": `${categoriesState.any ? "2px solid" : "2px solid transparent"}` }}>
                            <input type="checkbox" name="menuRow" value={categoriesState.any} checked={categoriesState.any} onChange={() => { dispatch(categoriesActions("resetCategories")); dispatch(categoriesListActions("removeAllCategories")) }} />
                            <label value="any" onClick={() => { dispatch(categoriesActions("resetCategories")); dispatch(categoriesListActions("removeAllCategories")) }}>Any</label>
                        </div>
                    </Row>
                    <Row>
                        <span className="allCategories">
                            <Row className="menuRow">
                                <div className="menuOption">
                                    <input type="checkbox" id="Dark" value={categoriesState.dark} checked={categoriesState.dark} onChange={
                                        (event) => { dispatch(categoriesActions("dark")); handleCategoryChange(event) }} /><label htmlFor="Dark">Dark</label>
                                </div>
                                <div className="menuOption"><input type="checkbox" id="Pun" value={categoriesState.pun} checked={categoriesState.pun} onChange={
                                    (event) => { dispatch(categoriesActions("pun")); handleCategoryChange(event) }} /><label htmlFor="Pun">Pun</label>
                                </div>
                                <div className="menuOption"><input type="checkbox" id="Programming" value={categoriesState.programming} checked={categoriesState.programming} onChange={
                                    (event) => { dispatch(categoriesActions("programming")); handleCategoryChange(event) }} />
                                    <label htmlFor="Programming">Programming</label>
                                </div>
                            </Row>
                            <Row className="menuRow">
                                <div className="menuOption"><input type="checkbox" id="Misc" value={categoriesState.misc} checked={categoriesState.misc} onChange={
                                    (event) => { dispatch(categoriesActions("misc")); handleCategoryChange(event) }} /><label htmlFor="Misc">Misc</label>
                                </div>
                                <div className="menuOption"><input type="checkbox" id="Spooky" value={categoriesState.spooky} checked={categoriesState.spooky} onChange={
                                    (event) => { dispatch(categoriesActions("spooky")); handleCategoryChange(event) }} /><label htmlFor="Spooky">Spooky</label>
                                </div>
                                <div className="menuOption"><input type="checkbox" id="Christmas" value={categoriesState.christmas} checked={categoriesState.christmas} onChange={
                                    (event) => { dispatch(categoriesActions("christmas")); handleCategoryChange(event) }} /><label htmlFor="Christmas">Christmas</label>
                                </div>
                            </Row>
                        </span>
                    </Row>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col md={6} sm={12} className="options">Select Language:</Col>
                <Col>
                    <select name="Language" value={languageState} onChange={(event) => dispatch(langSelectAction(event.target.value))}>
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
                    Select flags to blacklist (Optional):
                </Col>
                <Col>
                    <Row>
                        <span className="allBlackLists">
                            <Row className="flagSelect">
                                <div className="menuOption"><input type="checkbox" id="nsfw" value={blackFlagsState.nsfw} checked={blackFlagsState.nsfw} onChange={
                                    (event) => { dispatch(blackListFlagsActions("nsfw")); handleBlackListChange(event) }} />
                                    <label htmlFor="nsfw">NSFW</label>
                                </div>
                                <div className="menuOption"><input type="checkbox" id="religious" value={blackFlagsState.religious} checked={blackFlagsState.religious} onChange={
                                    (event) => { dispatch(blackListFlagsActions("religious")); handleBlackListChange(event) }} />
                                    <label htmlFor="religious">Religious</label>
                                </div>
                                <div className="menuOption"><input type="checkbox" id="political" value={blackFlagsState.political} checked={blackFlagsState.political} onChange={
                                    (event) => { dispatch(blackListFlagsActions("political")); handleBlackListChange(event) }} />
                                    <label htmlFor="political">Political</label>
                                </div>
                            </Row>
                            <Row className="flagSelect">
                                <div className="menuOption"><input type="checkbox" id="racist" value={blackFlagsState.racist} checked={blackFlagsState.racist} onChange={
                                    (event) => { dispatch(blackListFlagsActions("racist")); handleBlackListChange(event) }} />
                                    <label htmlFor="racist">Racist</label>
                                </div>
                                <div className="menuOption"><input type="checkbox" id="sexist" value={blackFlagsState.sexist} checked={blackFlagsState.sexist} onChange={
                                    (event) => { dispatch(blackListFlagsActions("sexist")); handleBlackListChange(event) }} />
                                    <label htmlFor="sexist">Sexist</label>
                                </div>
                                <div className="menuOption"><input type="checkbox" id="explicit" value={blackFlagsState.explicit} checked={blackFlagsState.explicit} onChange={
                                    (event) => { dispatch(blackListFlagsActions("explicit")); handleBlackListChange(event) }} />
                                    <label htmlFor="explicit">Explicit</label>
                                </div>
                            </Row>
                        </span>
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
                        value={searchStringState} onChange={(event) => dispatch(searchStringActions("changeString", event.target.value))} />
                    <Button variant={"outline-danger"} className="deleteButton" placeholder="Delete" onClick={() => dispatch(searchStringActions("delete"))}>Delete</Button>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col md={6} sm={12} className="options">
                    Select at least one joke type:
                </Col>
                <Col className="jokeType">
                    <div className="menuOption"><input type="checkbox" id="single" value={jokeTypeState.singlePart} checked={jokeTypeState.singlePart} onChange={
                        () => dispatch(jokeTypeActions("revertSinglePart"))} /><label htmlFor="single">Single Part</label>
                    </div>
                    <div className="menuOption"><input type="checkbox" id="twoPart" value={jokeTypeState.twoPart} checked={jokeTypeState.twoPart} onChange={
                        () => dispatch(jokeTypeActions("revertTwoPart"))} /><label htmlFor="twoPart">Two Part</label>
                    </div>
                </Col>
            </Row>
            <Row className="resetRow">
                <Button className="resetButton m-auto" onClick={reset}>Reset</Button>
            </Row>
            <Button className="searchButton mx-auto my-2" type="button" onClick={searchJoke}>Search</Button>
        </div>
    )
}

export default Menu