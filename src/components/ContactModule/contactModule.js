import React from 'react'
import phoneImage from '../../Assets/phone.svg'
import envelopeImage from '../../Assets/mail.svg';

const ContactModule = ({ aboutTitle, alt, hrefemail, hreftelephone }) => {
    const hrefmail = "mailto:" + hrefemail
    const hreftel = "tel:" + hreftelephone
    return (
        <div className="module">
            <div className="row text-center">
                <div className="col-12">
                    <a href={hrefmail}>
                        <img src={envelopeImage} alt={alt} />
                    </a>
                    <a href={hreftel}>
                        <img src={phoneImage} alt={alt} />
                    </a>
                    <p className="about-title">{aboutTitle}</p>
                </div>
            </div>
        </div>
    )
}

export default ContactModule