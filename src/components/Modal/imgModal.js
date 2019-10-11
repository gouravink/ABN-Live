import React from 'react';
import useRenderCount from "../../renderCountHook";
import ModalImage, { Lightbox } from "react-modal-image";

const ImgModal = () => {
    useRenderCount("MODAL")
    return (
        <ModalImage
            small="https://image.shutterstock.com/image-vector/demo-grunge-rubber-stamp-vector-260nw-155195639.jpg"
            large="https://image.shutterstock.com/image-vector/demo-grunge-rubber-stamp-vector-260nw-155195639.jpg"
        />
    )
};

export default ImgModal