import React, { useEffect, useState } from 'react';
import firebase from './Firebase';
import Player from "./Player";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image, Button, Modal, Table, ProgressBar, Tooltip, OverlayTrigger, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUser, faComment, faTrashAlt, faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faHeart as pieno, faPen } from '@fortawesome/free-solid-svg-icons';

export default function Ranking() {
    const [review, setReview] = useState([]);
    const [loading, setLoading] = useState(false);
    const [varieta, setVarieta] = useState();
    const [marca, setMarca] = useState();
    const [img, setImg] = useState();
    const [totale, setTotale] = useState(0);
    const [aspetto, setAspetto] = useState(0);
    const [odore, setOdore] = useState(0);
    const [fumata, setFumata] = useState(0);
    const [svapata, setSvapata] = useState(0);
    const [show, setShow] = useState(false);
    const [video, setVideo] = useState();
    const [aroma, setAroma] = useState();
    const [immagine, setImmagine] = useState(false);
    const [like, setLike] = useState([]);
    const [likeColor, setLikeColor] = useState('white');
    const [likeForm, setLikeForm] = useState(faHeart);
    const [modify, setModify] = useState('');
    const [modifica, setModifica] = useState('');
    const handleClose = () => setImmagine(false);
    const handleShow = () => setImmagine(true);
    const [comments, setComments] = useState([]);
    const [commento, setCommento] = useState('');
    const [tipo, setTipo] = useState()
    var position = 1;
    const ref = firebase.firestore().collection('recensioni');
    const roundTo = require('round-to');

    const updateState = querySnapshot => {
        const items = [];
        querySnapshot.forEach(doc => items.push(doc.data()));
        setReview(items.sort(function compareNumbers(a, b) {
            if (tipo >= 'Hash')
                return (b.aspetto + b.fumata) / 2 - (a.aspetto + a.fumata) / 2;
            else
                return (b.aspetto + b.fumata + b.odore + b.svapata) / 4 - (a.aspetto + a.fumata + a.odore + a.svapata) / 4;
        }));
    }

    const renderComments = comment => <div className="commenti">
        <div className="imput--commenti"><FontAwesomeIcon color='white' icon={faUser} /> {comment.username}</div>
        <div className="imput--commento"><FontAwesomeIcon color='rgb(194, 194, 194)' icon={faCalendar} /> {comment.data}</div>
        <div className="commenti--contenuti" >
            {modify !== comment.id ? <><FontAwesomeIcon color='white' icon={faComment} /> {comment.commento}</> :
                <div className='invia-commento'>
                    <input value={modifica} className='input' type='text' onChange={event => setModifica(event.target.value)} />
                    <Button onClick={() => {
                        setModify(null);
                        firebase.firestore().collection('commenti').doc(comment.id).update({ commento: modifica });
                    }}>Invia</Button>
                    <Button variant="danger" onClick={() => setModify(null)}>Annulla</Button>
                </div>
            }
            {firebase.auth().currentUser != null ? modify !== comment.id ? comment.utente === firebase.auth().currentUser.email ?
                <div style={{ paddingTop: '1%' }}>
                    <Button style={{ padding: '1%', margin: '1%' }} variant="info" onClick={() => { setModify(comment.id); setModifica(comment.commento) }}><FontAwesomeIcon color='white' icon={faPen} /></Button>
                    <Button style={{ padding: '1%', margin: '1%' }} variant="danger" onClick={() => firebase.firestore().collection('commenti').doc(comment.id).delete()}><FontAwesomeIcon color='white' icon={faTrashAlt} /></Button>
                </div> : null
                : null : null}
        </div>
    </div>

    useEffect(() => {
        setLoading(true);
        ref.onSnapshot(querySnapshot => updateState(querySnapshot));
        setLoading(false);
    }, []);

    const toName = aroma => {
        if (aroma === 'citrico') return 'Citrico ';
        if (aroma === 'skunk') return 'Skunk ';
        if (aroma === 'verde') return 'Verde ';
        if (aroma === 'altro') return 'Altro ';
        if (aroma === 'pungente') return 'Pungente ';
        if (aroma === 'agrumi') return 'Agrumi ';
        if (aroma === 'ananas') return 'Ananas ';
        if (aroma === 'bosco') return 'Bosco ';
        if (aroma === 'fresco') return 'Fresco ';
        if (aroma === 'fiori') return 'Fiori ';
        if (aroma === 'legno') return 'Legno ';
        if (aroma === 'frutta') return 'Frutta ';
        if (aroma === 'dolce') return 'Dolce ';
    }

    const renderReviews = recensione => (position <= 15 ?
        <tbody key={recensione.id} onClick={() => {
            setVarieta(recensione.varietà);
            setMarca(recensione.marca);
            setImg(recensione.img);
            setVideo(recensione.video);
            setAroma(recensione.aromi);
            setTipo(recensione.tipo);
            setShow(true);
            firebase.firestore().collection('voti').where('varietà', '==', recensione.varietà).onSnapshot(fetch => {
                const items = [];
                fetch.forEach(doc => items.push(doc.data()));
                setLike(items);
                if (firebase.auth().currentUser != null)
                    items.forEach(data => data.utente === firebase.auth().currentUser.email ? (setLikeColor('red'), setLikeForm(pieno)) : null);
            });
            setTimeout(() => {
                setAspetto(recensione.aspetto);
                setFumata(recensione.fumata);
                setOdore(recensione.odore);
                setSvapata(recensione.svapata);
                setTotale(recensione.tipo >= 'Hash' ? roundTo((recensione.aspetto + recensione.fumata) / 2, 1) :
                    roundTo((recensione.aspetto + recensione.fumata + recensione.odore + recensione.svapata) / 4, 1));
            }, 100);
            firebase.firestore().collection('commenti').where('varietà', '==', recensione.varietà).onSnapshot(comment => {
                const items = [];
                comment.forEach(doc => items.push(doc.data()));
                setComments(items.reverse());
            });
        }}>
            <tr>
                <td>{position++}</td>
                <td>{recensione.varietà}</td>
                <td>{recensione.marca}</td>
                <td>{recensione.tipo >= 'Hash' ?
                    roundTo((recensione.aspetto + recensione.fumata) / 2, 1) :
                    roundTo((recensione.aspetto + recensione.fumata + recensione.odore + recensione.svapata) / 4, 1)}</td>
            </tr>
        </tbody> : null);

    const renderTooltipModal = (props, recensione) => (
        <Tooltip id="button-tooltip" {...props}>
            {recensione === undefined ? null : recensione.map(aroma => toName(aroma))}
        </Tooltip>
    );

    const mettoLike = () => {
        const date = Date.now().toString();
        firebase.firestore().collection('voti').doc(date).set({
            id: date,
            utente: firebase.auth().currentUser.email,
            varietà: varieta
        })
    };

    return (
        <>
            {loading && <h2 style={{ color: 'white' }}><Spinner animation="grow" /></h2>}
            <div className="ranking">
                <h1 style={{ color: 'white' }}>Migliori 2020</h1>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>2020</th>
                            <th>Varietà</th>
                            <th>Azienda</th>
                            <th>Voto</th>
                        </tr>
                    </thead>
                    {review.map(data => renderReviews(data))}
                </Table>
            </div>
            <Modal size='lg' show={show} centered onHide={() => {
                setShow(false);
                setOdore(0);
                setFumata(0);
                setSvapata(0);
                setTotale(0);
                setAspetto(0);
                setLikeColor('white');
                setLikeForm(faHeart);
            }} >
                <Modal.Header closeButton>
                    <Modal.Title bsPrefix='modal_title'><Link to={"/company/" + marca}><p className="azienda--modal">{marca}</p></Link></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ color: '#2c2c32' }}>
                    <p className="modal--voti modal--nome--varieta">{varieta}
                        <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltipModal(1, aroma)}>
                            <Button variant="link" style={{ boxShadow: 'none' }}>
                                {aroma === undefined ? null :
                                    aroma.map(aroma => <img src={process.env.PUBLIC_URL + "/images/gusti/" + aroma + ".png"} width="45" height="45" />)}
                            </Button>
                        </OverlayTrigger>
                    </p>
                    <div className='row--modal row--modal_736'>
                        <div className='col col-50s modal--img_736'>
                            <img onClick={handleShow} className='img' src={img} />
                        </div>
                        <div className='col col-50s modal--voti_736'>
                            <div className='riga'>
                                <p className="voti">Aspetto <ProgressBar className='progress' animated min={0} max={10} now={aspetto} label={aspetto} /></p>
                                {tipo !== 'Hash' ? <>
                                    <p className="voti">Odore<ProgressBar className='progress' animated min={0} max={10} now={odore} label={odore} /></p>
                                    <p className="voti">Svapata<ProgressBar className='progress' animated min={0} max={10} now={svapata} label={svapata} /></p>
                                </> : null}
                                <p className="voti">Fumata<ProgressBar className='progress' animated min={0} max={10} now={fumata} label={fumata} /></p>
                                <p className="voti">Totale<ProgressBar className='progress' animated min={0} max={10} now={totale} label={totale} /></p>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="per--like">
                        {firebase.auth().currentUser === null ? <Link to='/login'><FontAwesomeIcon color='white' icon={likeForm} size='2x' /></Link> :
                            <FontAwesomeIcon color={likeColor} icon={likeForm} size='2x' onClick={() => {
                                var fallo = true;
                                if (like.length === 0) {
                                    fallo = false;
                                    setLikeColor('red');
                                    setLikeForm(pieno);
                                    mettoLike();
                                }
                                else like.forEach(data => {
                                    if (data.utente === firebase.auth().currentUser.email) {
                                        fallo = false;
                                        setLikeColor('white');
                                        setLikeForm(faHeart);
                                        return firebase.firestore().collection('voti').doc(data.id).delete();
                                    }
                                })
                                if (fallo) {
                                    setLikeColor('red');
                                    setLikeForm(pieno);
                                    mettoLike();
                                }
                            }} />
                        }
                        <div style={{ color: 'white' }}>
                            {like.length}
                        </div>
                    </div>
                    <div className='player'>
                        <Player videoId={video} />
                    </div>
                    <hr className='visibleSeparator' />
                    {firebase.auth().currentUser == null ? <div className="per--commenti">Accedi per commentare</div> :
                        <div className="per-commentare">
                            <input value={commento} className='input-commento' type='text' placeholder='Commenta' onChange={event => setCommento(event.target.value)} />
                            <Button className="invia-commento" disabled={commento === '' ? true : false} onClick={() => {
                                const date = Date.now().toString();
                                let today = new Date();
                                firebase.firestore().collection('commenti').doc(date).set({
                                    utente: firebase.auth().currentUser.email,
                                    username: firebase.auth().currentUser.displayName,
                                    commento: commento,
                                    varietà: varieta,
                                    id: date,
                                    data: today.getDate() + "/" + parseInt(today.getMonth() + 1) + "/" + today.getFullYear()
                                }).then(() => console.log("Commento pubblicato!")).catch(error => console.error("Errore: ", error));
                                setCommento('');
                            }}>Invia</Button>
                        </div>}
                    {comments.map(data => renderComments(data))}
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: 'center' }}>
                    <Button href='https://www.amazon.it/ref=nav_logo' variant="primary">Acquista</Button>
                </Modal.Footer>
            </Modal>
            <Modal size='xl' show={immagine} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: 'white' }}>{varieta}</Modal.Title>
                </Modal.Header>
                <Image style={{ borderBottomRightRadius: 30, borderBottomLeftRadius: 30 }} src={img} fluid />
            </Modal>
        </>
    );
}