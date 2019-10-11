import React from 'react'
import "./404.css"
import pageNotFoundImage from "../../Assets/404-error.png"
import sad404Image from "../../Assets/sad404.svg"
import Button from "../../components/Button/button";

const PageNotFound = () => {

    return (
        <div id="container" className="container error-body">
            <div className="post">
                <div className="profile-logo">
                    <img src = {pageNotFoundImage} alt="not-found-img" />
                </div>
                <h2 className="name">Whoops! <span><img className="sad404" src = {sad404Image} alt="not-found-message-img"/></span></h2>
                <div className="actions">
                    <div className="follow-info">
                        <p>We couldn't find the page you were looking for</p>
                    </div>
                    <div className="follow-btn text-center">
                        <Button title="Back to Home" to = "/dashboard" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound