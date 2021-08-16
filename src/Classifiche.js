import React from 'react';
import Filosofi from './components/Filosofi';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Navigazione from './components/Navigazione';
import Carosello from './components/Carosello';
import Tabelle from './components/Tabelle';
import './styles/Home.css';

export function Classifiche() {
    return (
        <div className='page-container'>
            <Navigazione />
            <div className="App">
                <Filosofi />
                <Carosello />
                <br />
                <Tabelle defaultActiveKey='classifiche' />
            </div>
            <ScrollToTop />
            <br />
            <Footer />
        </div>
    );
};