import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'

const reRender = () => {
    // console.log("aasd")
}

const Menu = (props) => {

    const baseUrl = `https://v2.jokeapi.dev/joke/Any?type=single`
    const [url, setUrl] = useState(baseUrl)


    const sendUrl = () => {
        props.getUrl(url)
    }
    sendUrl()
    // call the function to actually send the url to App.js

    // const [categories, setCategories] = useState([])
    // const changeCategories = (event) => {
    //     setCategories((prevCategories)) console.log(e.target.checked)
    // }
    return (
        <div>
            <h1>What kind of joke are you looking for?</h1>
            <Row>
                <Col md={6} sm={12} className="headers">
                    Select Category / Categories:
                </Col>
                <Col>
                    <Row>
                        <input type="radio" name="catSelect" value="any" id="cat-radio1" onchange="reRender()" />
                        <label for="cat-radio1">Any</label>
                    </Row>
                    <Row>
                        <span id="catSelectMulti">
                            <Row>
                                <input type="checkbox" id="cat-cb3" value="Dark" onchange={(e) => props.displayCategory(e)} /><label for="cat-cb3">Dark</label>
                                <input type="checkbox" id="cat-cb1" value="Programming" onchange={(e) => console.log(e.target.check)} /><label for="cat-cb1">Programming</label>
                                <input type="checkbox" id="cat-cb2" value="Misc" onchange={(e) => props.displayCategory(e)} /><label for="cat-cb2">Misc</label>
                            </Row>
                            <Row>
                                <input type="checkbox" id="cat-cb4" value="Pun" onchange={(e) => props.displayCategory(e)} /><label for="cat-cb4">Pun</label>
                                <input type="checkbox" id="cat-cb5" value="Spooky" onchange={(e) => props.displayCategory(e)} /><label for="cat-cb5">Spooky</label>
                                <input type="checkbox" id="cat-cb6" value="Christmas" onchange={(e) => props.displayCategory(e)} /><label for="cat-cb6">Christmas</label>
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
                        <input type="checkbox" id="blf-cb1" onchange={reRender()} /><label for="blf-cb1">nsfw</label>
                        <input type="checkbox" id="blf-cb2" onchange={reRender()} /><label for="blf-cb2">religious</label>
                        <input type="checkbox" id="blf-cb3" onchange={reRender()} /><label for="blf-cb3">political</label>
                    </Row>
                    <Row>
                        <input type="checkbox" id="blf-cb4" onchange={reRender()} /><label for="blf-cb4">racist</label>
                        <input type="checkbox" id="blf-cb5" onchange={reRender()} /><label for="blf-cb5">sexist</label>
                        <input type="checkbox" id="blf-cb6" onchange={reRender()} /><label for="blf-cb6">explicit</label>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Menu
export { reRender }