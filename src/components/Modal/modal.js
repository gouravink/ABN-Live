import React from 'react';
import './modal.css';
import useRenderCount from "../../renderCountHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ show, handleClose, children }) => {
    useRenderCount("MODAL")
    return (
        <div className={show ? "modals" : null}>
            <section className="modals-main"
                style={{ transform: show ? 'translateY(0) scale(1)' : 'translateY(-100vh) scale(0.7)' }}
            >
                {children}
                <div onClick={handleClose} className="close-icon">
                    <FontAwesomeIcon icon={faTimesCircle} />
                </div>
            </section>
        </div>
    )
};

export default Modal