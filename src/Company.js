import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import './styles/Company.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faUser, faComment, faTrashAlt, faCalendar } from '@fortawesome/free-regular-svg-icons';
import firebase from './components/Firebase';
import { faMailBulk, faSitemap, faHeart as pieno, faPen } from '@fortawesome/free-solid-svg-icons';
import Footer from './components/Footer';
import Carousel from 'react-elastic-carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image, Card, Button, Modal, ProgressBar, Spinner, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Player from "./components/Player";
import { Link } from 'react-router-dom';
import GoogleMap from './components/GoogleMap';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1 },
    { width: 768, itemsToShow: 2, itemsToScroll: 2 },
    { width: 1200, itemsToShow: 3, itemsToScroll: 3 }
];

export function Company() {
    const [products, setProducts] = useState([]);
    const [company, setCompany] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [error, setError] = useState([]);
    const [varieta, setVarieta] = useState();
    const [img, setImg] = useState();
    const [totale, setTotale] = useState();
    const [aspetto, setAspetto] = useState();
    const [odore, setOdore] = useState();
    const [fumata, setFumata] = useState();
    const [svapata, setSvapata] = useState();
    const [video, setVideo] = useState();
    const [aroma, setAroma] = useState();
    const [tipo, setTipo] = useState();
    let { id } = useParams();
    const roundTo = require('round-to');
    const [comments, setComments] = useState([]);
    const [commento, setCommento] = useState('');
    const [like, setLike] = useState([]);
    const [likeColor, setLikeColor] = useState('white');
    const [likeForm, setLikeForm] = useState(faHeart);
    const [immagine, setImmagine] = useState(false);
    const handleClose = () => setImmagine(false);
    const handleShow = () => setImmagine(true);
    const [modify, setModify] = useState('');
    const [modifica, setModifica] = useState('');

    useEffect(() => {
        firebase.firestore().collection('aziende').doc(id).get().then(response => {
            if (response.data === "undefined") setError("undefined");
            else setCompany(response.data());
        });
        firebase.firestore().collection('recensioni').get().then(response => {
            const prodotti = [];
            response.forEach(prodotto => prodotti.push(prodotto.data()));
            setProducts(prodotti);
        });
        setLoading(false);
    }, []);

    if (loading) return <h1 style={{ color: 'white' }}><Spinner animation="grow" /></h1>

    if (!error.length === 0) return <h1>Pagina non trovata.</h1>

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

    const renderComments = comment => (
        <div className="commenti">
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
    );

    const Mailto = ({ email, subject = '', body = '', children }) => {
        let params = subject || body ? '?' : '';
        if (subject) params += `subject=${encodeURIComponent(subject)}`;
        if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;
        return <a href={`mailto:${email}${params}`}>{children}</a>;
    };

    const renderTooltip = (props, recensione) => (
        <Tooltip id="button-tooltip" {...props}>
            {recensione.aromi === undefined ? null : recensione.aromi.map(aroma => toName(aroma))}
        </Tooltip>
    );

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

    return (
        <div className="companyBody">
            <Link to={"/"}><p className="modal--voti azienda--modal">Indietro</p></Link>
            <div className="company_Body-card">
                <div className="nameCompany col-50 padding-20 tito-title" >
                    <div className="company__img logo-titolo">
                        <img src={company.logo} alt="" />
                    </div>
                    <div className="titolo-posizione col-50">
                        <h2 className="title">{company.nome} </h2>
                    </div>
                </div>
                <br />
                <div className="">
                    <div className="grid-company">
                        <div className="col-65 col-50s padding-20">
                            <div className="brb description padding-20 tito">
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores, perspiciatis animi commodi assumenda totam nisi iure nulla, aliquam ipsam esse, dolore harum omnis repellat nostrum repellendus eligendi quae doloremque numquam.</p>
                            </div>
                            <br />
                            <br />
                            <div className="brb tito">
                                <div className="carusel__company padding-20">
                                    <Carousel breakPoints={breakPoints}>
                                        {products.filter(value => value.marca === company.nome).map(filteredProduct => (
                                            <Card className="box card__reviews-company" key={filteredProduct.id}
                                                onClick={() => {
                                                    firebase.firestore().collection('voti').where('varietà', '==', filteredProduct.varietà).onSnapshot(fetch => {
                                                        const items = [];
                                                        fetch.forEach(doc => items.push(doc.data()));
                                                        setLike(items);
                                                        if (firebase.auth().currentUser != null)
                                                            items.forEach(data => data.utente === firebase.auth().currentUser.email ? (setLikeColor('red'), setLikeForm(pieno)) : null);
                                                    });
                                                    setTipo(filteredProduct.tipo)
                                                    setVarieta(filteredProduct.varietà);
                                                    setImg(filteredProduct.img);
                                                    setVideo(filteredProduct.video);
                                                    setAroma(filteredProduct.aromi);
                                                    setShow(true);
                                                    setTimeout(() => {
                                                        setFumata(filteredProduct.fumata);
                                                        setAspetto(filteredProduct.aspetto);
                                                        setOdore(filteredProduct.odore);
                                                        setSvapata(filteredProduct.svapata);
                                                        setTotale(filteredProduct.tipo >= 'Hash' ?
                                                            roundTo((filteredProduct.aspetto + filteredProduct.fumata) / 2, 1) :
                                                            roundTo((filteredProduct.aspetto + filteredProduct.fumata + filteredProduct.odore + filteredProduct.svapata) / 4, 1));
                                                    }, 100);
                                                    firebase.firestore().collection('commenti').where('varietà', '==', filteredProduct.varietà).onSnapshot(comment => {
                                                        const items = [];
                                                        comment.forEach(doc => items.push(doc.data()));
                                                        setComments(items.reverse());
                                                    });
                                                }}>
                                                <Card.Img className='card_img' variant="top" src={filteredProduct.img} />
                                                <Card.Body>
                                                    <Card.Title>{filteredProduct.varietà}</Card.Title>
                                                    <Card.Text>
                                                        <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip(1, filteredProduct)}>
                                                            <Button variant="link" style={{ boxShadow: 'none' }}>
                                                                {filteredProduct.aromi === undefined ? null :
                                                                    filteredProduct.aromi.map(aroma => <img src={process.env.PUBLIC_URL + "/images/gusti/" + aroma + ".png"} width="45" height="45" />)}
                                                            </Button>
                                                        </OverlayTrigger>
                                                        <br />Voto: {filteredProduct.tipo >= 'Hash' ?
                                                            roundTo((filteredProduct.aspetto + filteredProduct.fumata) / 2, 1) :
                                                            roundTo((filteredProduct.aspetto + filteredProduct.fumata + filteredProduct.odore + filteredProduct.svapata) / 4, 1)}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                        <div className="odina-company col-30 col-50s padding-20 tito">
                            <div className="contattiCompany">
                                <h2 className="subTitle white">Contatti</h2>
                                <div className="row--company">
                                    <div className='social-container'>
                                        <Mailto email={company.email}>
                                            <a className="email facebook social inriga" >
                                                <FontAwesomeIcon icon={faMailBulk} size='2x' />
                                                <p>filosofinerba@gmail.com</p>
                                            </a>
                                        </Mailto>
                                    </div>
                                    <div className=' social-container'>
                                        <a className="instagram social inriga" href={company.instagram}>
                                            <FontAwesomeIcon icon={faInstagram} size='2x' />
                                            <p>filosofi_in_erba</p>
                                        </a>
                                    </div>
                                    <div className='social-container'>
                                        <a className="facebook social inriga" href={company.sito}>
                                            <FontAwesomeIcon icon={faSitemap} size='2x' />
                                            <p>filosiinerba.it</p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="evntuale__maps col-50s">
                                <GoogleMap />
                            </div>
                        </div>
                    </div>

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
                        <Modal.Title className="azienda--modal" bsPrefix='modal_title'>{varieta}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ color: '#2c2c32' }}>
                        <p className="modal--voti modal--nome--varieta">
                            <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltipModal(1, aroma)}>
                                <Button variant="link" style={{ boxShadow: 'none' }}>
                                    {aroma === undefined ? null :
                                        aroma.map(aroma => <img src={process.env.PUBLIC_URL + "/images/gusti/" + aroma + ".png"} width="45" height="45" />)}
                                </Button>
                            </OverlayTrigger>
                        </p>
                        <div className='row--modal row--modal_736'>
                            <div className='col col-50s'>
                                <img onClick={handleShow} className='img' src={img} />
                            </div>
                            <div className='col col-50s'>
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
                            {firebase.auth().currentUser === null ? <Link to='/login'><FontAwesomeIcon color='white' icon={faHeart} size='2x' /></Link> :
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
            </div>
            <br />
            <Footer />
        </div>
    );
}