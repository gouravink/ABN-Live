import React from 'react';
import { Link } from 'react-router-dom';


const Navigation = ({ src, title, alt, to, onClick }) => {
    return (
        <Link to={to}>
            <div className="module">
                <div className="row text-center">
                    <div className="col-12">
                        <img src={src} alt={alt} onClick={onClick} />
                        <p>{title}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Navigation 