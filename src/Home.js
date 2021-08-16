import React from 'react';
import { Link } from 'react-router-dom';
import firebase from './components/Firebase';
import Filosofi from './components/Filosofi';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Carosello from './components/Carosello';
import Tabelle from './components/Tabelle';
import './styles/Home.css';
import { Button } from 'react-bootstrap';

export function Home() {
    const refreshPage = () => window.location.reload();

    return (
        <div className='page-container'>
            <div className='sopra'>
                {firebase.auth().currentUser == null ? <Link className="nnBg" to="/login">Accedi</Link>
                    : <Button variant="link" style={{ boxShadow: 'none' }} className="nnBg" onClick={() => { firebase.auth().signOut(); refreshPage(); }}>Esci</Button>}
            </div>
            <div className="App">
                <Filosofi />
                <Carosello />
                <br />
                <Tabelle defaultActiveKey='home' />
            </div>
            <ScrollToTop />
            <br />
            <Footer />
        </div>
    );
};