import React from "react";
import { Link } from 'react-router-dom';

const FooterItem = ({ title, src, to }) => {
    return (
        <div className="col-4">
            <Link to={to}>
                <img alt="icon" src={src}></img>
                <p className="m-0">{title}</p>
            </Link>
        </div>
    )
}

export default FooterItem