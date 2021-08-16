import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import firebase from './components/Firebase';
import { AuthContext } from "./components/Auth.js";
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/registrazione.css';
import foto1 from './img/foto1.jpg';
import foto2 from './img/foto2.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import GoogleLogin from "./components/GoogleLogin";

const Login = ({ history }) => {
    const [password, setPassword] = useState('password');
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password, username } = event.target.elements;
        try {
            await firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
            await firebase.auth().currentUser.updateProfile({ displayName: username.value });
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history]);

    const { currentUser } = useContext(AuthContext);

    if (currentUser) return <Redirect to="/" />;

    function toggleform() {
        var section = document.querySelector('section');
        var container = document.querySelector('.container');
        container.classList.toggle('active');
        section.classList.toggle('active');
    }

    return (
        <section>
            <div className="container">
                <div className="user signinBx">
                    <div className="imgBx"><img src={foto1} alt="" /></div>
                    <div className="formBx">
                        <Form onSubmit={handleLogin}>
                            <h2>Accedi</h2>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control name="email" type="email" placeholder="Inserisci l'email" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control name="password" type={password} placeholder="Password" />
                                {password === 'text' ?
                                    <FontAwesomeIcon icon={faEyeSlash} onClick={() => setPassword('password')} /> :
                                    <FontAwesomeIcon icon={faEye} onClick={() => setPassword('text')} />
                                }
                            </Form.Group>
                            <Button variant="primary" type="submit">Accedi</Button>
                            <p className="signup">non hai un account? <a href="#" onClick={toggleform} >Iscriviti</a></p>
                            <hr className='visibleSeparator' />
                            <GoogleLogin />
                        </Form>
                    </div>
                </div>
                <div className="user signupBx">
                    <div className="formBx">
                        <Form onSubmit={handleSignUp}>
                            <h2>Crea un'account</h2>
                            <Form.Group controlId="formBasicUsername">
                                <Form.Control name="username" type="username" placeholder="Nome utente" />
                                <Form.Control.Feedback type="valid">Va bene!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Non va bene</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control name="email" type="email" placeholder="Email" />
                                <Form.Control.Feedback type="valid">Va bene!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Non va bene</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control name="password" type={password} placeholder="Password" />
                                <Form.Control.Feedback type="valid">Va bene!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Non va bene</Form.Control.Feedback>
                                {password === 'text' ?
                                    <FontAwesomeIcon icon={faEyeSlash} onClick={() => setPassword('password')} /> :
                                    <FontAwesomeIcon icon={faEye} onClick={() => setPassword('text')} />
                                }
                            </Form.Group>
                            <Button variant="primary" type="submit">Registrati</Button>
                            <p class="signup">hai un account?<a href="#" onClick={toggleform}>Accedi</a></p>
                        </Form>
                    </div>
                    <div className="imgBx"><img src={foto2} alt="" /></div>
                </div>
            </div>
        </section>
    );
};

export default withRouter(Login);