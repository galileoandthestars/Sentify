import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Row, Col, Image } from "react-bootstrap";
import useToken from '../components/useToken';
import aboutImg from "../Assets/img/1879056.png";
import { toggleScroll } from "../components/toggleScroll";

async function loginUser(credentials) {
    return fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then((response) => response.json())
        .then((messages) => { console.log(messages); });
}

export const Login = () => {
    const navigate = useNavigate();
    const { setToken } = useToken();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const { scroll, setScroll } = toggleScroll();

    if (scroll) {
        setScroll(true);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            email,
            pass
        });
        setToken(token);
        navigate("/dashboard");
    }

    return (
        <div className="login-page">
            <Navbar expand="lg">
                <Container fluid>
                    {/* <Link className="link-home-login" to="/">Sentify</Link> */}
                    <Navbar.Brand><Link className="link-home-login" to="/">Sentify</Link></Navbar.Brand>
                </Container>
            </Navbar>
            <Container>
                <Row className="align-items-center">
                    <Col>
                        <Image className="login-img" src={aboutImg} alt="about img" fluid />
                    </Col>
                    <Col className="d-flex align-items-center justify-content-center">
                        <div className="login-form-container">
                            <div className="login-form-header">
                                <span>User Login</span>
                            </div>
                            <form className="login-form" onSubmit={handleSubmit}>
                                <input className="login-input" value={email} name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                <input className="login-input" value={pass} name="password" type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} />
                                <button className="submit-button" type="submit">Log In</button>
                                <Link className="link-button" to="/register">Don't have an account? Register here.</Link>
                            </form>
                        </div>
                        {/* <div className="auth-form-container">
                            <h2>Login</h2>
                            <form className="login-form" onSubmit={handleSubmit}>
                            <label htmlFor="email" className="login-label">E-mail</label>
                            <input value={email} className="login-input" onChange={(e) => setEmail(e.target.value)} placeholder="youremail@gmail.com" id="email" name="email" />
                            <label htmlFor="password" className="login-label">Password</label>
                            <input value={pass} className="login-input" onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                            <button className="submit-btn" type="submit">Log In</button>
                            </form>
                            <Link className="link-btn" to="/register">Don't have an account? Register here.</Link>
                        </div> */}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
