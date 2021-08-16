import React from 'react';
import '../styles/Footer.css';

export default function Footer() {
    return (
        <div className='main-footer'>
            <div className='container'>
                <div className="grid">
                    {/* Column1*/}
                    <div className="col-70 col-50s">
                        <h4>CONTATTI</h4>
                        <ui className="">
                            <li>Email: filosofinerba@gmail.com</li>
                            <li>Cellulare: 3311234567</li>
                            <li>Qualcosa: veramente</li>
                        </ui>
                    </div>
                    {/* Column2*/}
                    <div className='col-30 col-50s'>
                        <h4>SOCIAL</h4>
                        <ui className=''>
                            <li>Instagram: filosofi_in_erba</li>
                            <li>Telegram: Growers in Erba</li>
                            <li>Youtube: Filosofi in Erba</li>
                        </ui>
                    </div>
                </div>
                <hr />
                <div className='grid--center'>
                    <p className='col-80'>
                        &copy;{new Date().getFullYear()} Filosofi In Erba | Tutti i diritti riservati | Termini di Servizio | Privacy
                    </p>
                </div>
            </div>
        </div>
    );
}