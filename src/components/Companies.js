import React, { useEffect, useState } from 'react'
import firebase from './Firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';

export default function Companies() {
    const [company, setCompany] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lastDoc, setLastDoc] = useState();
    const [isEmpty, setIsEmpty] = useState(false);
    const ref = firebase.firestore().collection('aziende');
    const fetchMore = () => ref.startAfter(lastDoc).limit(12).onSnapshot(querySnapshot => updateState(querySnapshot));

    const updateState = querySnapshot => {
        if (querySnapshot.size !== 0) {
            const items = [];
            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
            querySnapshot.forEach(doc => items.push(doc.data()));
            setCompany(list => [...list, ...items]);
            setLastDoc(lastDoc);
        } else setIsEmpty(true);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        ref.limit(12).onSnapshot(querySnapshot => updateState(querySnapshot));
    }, []);

    const renderCompanies = azienda => (
        <Link to={"/company/" + azienda.nome}>
            <Card className="box card__reviews" key={azienda.id} onClick={() => { }}>
                <Card.Img className='company_img' variant="top" src={azienda.logo} />
                <Card.Body>
                    <Card.Title>{azienda.nome}</Card.Title>
                </Card.Body>
            </Card>
        </Link>
    );

    return (
        <>
            {loading && <h2 style={{ color: 'white' }}><Spinner animation="grow" /></h2>}
            <div className="conteinerRecensioni">
                {company.map(data => renderCompanies(data))}
            </div>
            {!loading && !isEmpty && <Button className="btn__fullcard" variant="secondary" style={{ backgroundColor: "#2c2c32" }} onClick={fetchMore}>Di più <FontAwesomeIcon color='white' icon={faArrowAltCircleDown} /></Button>}
            {isEmpty && <h1 style={{ color: 'white' }}>Fine</h1>}
        </>
    );
}