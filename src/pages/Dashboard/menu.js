import React from "react";

const Menu = ({ title, src, className, alt }) => {
    const classNames = "col-8 mb-4 " + className;
    return (
        <div className="row">
            <div className={classNames}>
                <div className="row align-items-center dash-item h-100 ml-0 mr-0">
                    <div className="col-5 icon">
                        <img alt={alt} src={src}></img>
                    </div>
                    <div className="col-7 menu-txt">
                        <p className="m-0">{title}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Menu