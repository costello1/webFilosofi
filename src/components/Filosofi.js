import React from 'react';
import logo from '../img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faFacebook, faTelegram, faInstagram } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image } from 'react-bootstrap';

export default function Filosofi() {
    return (
        <div className='navIntro'>
            <span className="avatar"><Image src={logo} className="App-logo" roundedCircle /></span>
            <p>FILOSOFI IN ERBA</p>
            <div className='social-container'>
                <a className="youtube social" href="https://www.youtube.com/channel/UCRVceboNw0A6hrbd538AGFA"  >
                    <FontAwesomeIcon icon={faYoutube} size='2x' />
                </a>
                <a className="instagram social" href="https://www.instagram.com/filosofi_in_erba/"   >
                    <FontAwesomeIcon icon={faInstagram} size='2x' />
                </a>
                <a className="facebook social" href="https://www.facebook.com/Filosofi-in-erba-20-112849270293339" >
                    <FontAwesomeIcon icon={faFacebook} size='2x' />
                </a>
                <a className="telegram social" href="https://t.me/GrowersinErba" >
                    <FontAwesomeIcon icon={faTelegram} size='2x' />
                </a>
            </div>
        </div>
    );
}