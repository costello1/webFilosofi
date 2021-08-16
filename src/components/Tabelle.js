import React from 'react';
import Reviews from './Reviews';
import Companies from './Companies';
import Ranking from './Ranking';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Tabelle({ defaultActiveKey }) {
    return (
        <Tabs className="home--tab" defaultActiveKey={defaultActiveKey}>
            <Tab className="tab_bg" eventKey={'aziende'} title="Aziende">
                <br />
                <Companies />
                <br />
            </Tab>
            <Tab className="tab_bg" eventKey={'home'} title="Recensioni">
                <br />
                <Reviews />
                <br />
            </Tab>
            <Tab className="tab_bg" eventKey="classifiche" title="Classicfiche">
                <br />
                <Ranking />
                <br />
            </Tab>
            <Tab className="tab_bg" eventKey="merch" title="Merch">
                <br />
                <h1 style={{ color: 'white' }}>Coming Soon...</h1>
                <br />
            </Tab>
            <Tab className="tab_bg" eventKey="info" title="Info">
                <br />
                <h1 style={{ color: 'white' }}>Coming Soon...</h1>
                <br />
            </Tab>
        </Tabs>
    );
}