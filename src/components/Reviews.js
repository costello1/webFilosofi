import React, { useEffect, useState } from 'react';
import firebase from './Firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Form, Button, Dropdown, Spinner } from 'react-bootstrap';
import Recensione from './Recensione';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';

export default function Reviews() {
  const [allReviews, setAllReviews] = useState([]);
  const [review, setReview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [search, setSearch] = useState('');
  const [filtro, setFiltro] = useState('Varietà');
  const ref = firebase.firestore().collection('recensioni');
  const [tipo, setTipo] = useState('');
  const fetchMore = () => tipo === '' ?
    ref.startAfter(lastDoc).limit(12).onSnapshot(querySnapshot => updateState(querySnapshot)) :
    ref.startAfter(lastDoc).where('tipo', '==', tipo).limit(12).onSnapshot(querySnapshot => updateState(querySnapshot));

  const updateState = querySnapshot => {
    if (querySnapshot.size !== 0) {
      const items = [];
      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      querySnapshot.forEach(doc => items.push(doc.data()));
      setReview(list => [...list, ...items]);
      setLastDoc(lastDoc);
    } else setIsEmpty(true);
    setLoading(false);
  }

  const fetchReviews = fetch => {
    const items = [];
    fetch.forEach(doc => items.push(doc.data()));
    setAllReviews(items);
  }

  useEffect(() => {
    setLoading(true);
    ref.limit(12).onSnapshot(querySnapshot => updateState(querySnapshot));
    ref.onSnapshot(onSnapshot => fetchReviews(onSnapshot));
  }, []);

  return (
    <>
      {loading && <h2 style={{ color: 'white' }}><Spinner animation="grow" /></h2>}
      <div className='row'>
        <div className="due-input">
          <input className='input' type='text' placeholder='Cerca...' onChange={event => setSearch(event.target.value)} />
          <Dropdown className='input-varieta'>
            <Dropdown.Toggle id="dropdown-basic" variant='secondary' style={{ backgroundColor: "#2c2c32", boxShadow: 'none' }}>{filtro}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setFiltro('Azienda')} style={{ color: "white" }}>Azienda</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => setFiltro('Varietà')}>Varietà</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Form.Group className="tre--pallini col-50s">
          <Row className="tre--pallini_contenuto" sm={10}>
            <Form.Check
              onClick={() => {
                setReview([]);
                setLastDoc('');
                setIsEmpty(false);
                setTipo('');
                ref.limit(12).onSnapshot(querySnapshot => {
                  const items = [];
                  const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
                  querySnapshot.forEach(doc => items.push(doc.data()));
                  setReview(items);
                  setLastDoc(lastDoc);
                });
              }}
              inline
              type="radio"
              label="Tutto"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
              defaultChecked
            />
            <Form.Check
              onClick={() => {
                setReview([]);
                setLastDoc('');
                setIsEmpty(false);
                setTipo('Erba');
                ref.where('tipo', '==', 'Erba').limit(12).onSnapshot(querySnapshot => {
                  const items = [];
                  const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
                  querySnapshot.forEach(doc => items.push(doc.data()));
                  setReview(items);
                  setLastDoc(lastDoc);
                });
              }}
              inline
              type="radio"
              label="Erba"
              name="formHorizontalRadios"
              id="formHorizontalRadios2"
            />
            <Form.Check
              onClick={() => {
                setReview([]);
                setLastDoc('');
                setIsEmpty(false);
                setTipo('Hash');
                ref.where('tipo', '==', 'Hash').limit(12).onSnapshot(querySnapshot => {
                  const items = [];
                  const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
                  querySnapshot.forEach(doc => items.push(doc.data()));
                  setReview(items);
                  setLastDoc(lastDoc);
                });
              }}
              inline
              type="radio"
              label="Hash"
              name="formHorizontalRadios"
              id="formHorizontalRadios3"
            />
          </Row>
        </Form.Group>
      </div>
      <Recensione tipo={tipo} review={review} allReviews={allReviews} search={search} filtro={filtro} />
      {!loading && !isEmpty && search === '' && <Button className="btn__fullcard" style={{ backgroundColor: "#2c2c32" }} variant="secondary" onClick={fetchMore}>Di più <FontAwesomeIcon color='white' icon={faArrowAltCircleDown} /></Button>}
      {isEmpty && <h1 style={{ color: 'white' }}>Fine</h1>}
    </>
  );
}