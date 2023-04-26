import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import { toggleScroll } from "../components/toggleScroll";

async function registerUser(credentials) {
    return fetch("/register", {
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

export const SignUp = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [confPass, setConfPass] = useState('');

    const { scroll, setScroll } = toggleScroll();

    if (scroll) {
        setScroll(true);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const throwaway = await registerUser({
            email,
            pass,
            name,
            confPass
        });
        navigate("/login");
    }

    return (
        <div className="register-page">
            <Navbar expand="lg">
                <Container fluid>
                    {/* <Link className="link-home-login" to="/">Sentify</Link> */}
                    <Navbar.Brand><Link className="link-home-login" to="/">Sentify</Link></Navbar.Brand>
                </Container>
            </Navbar>
            <div className="register-form-container">
                <div className="register-form-header">
                    <span>Register</span>
                </div>
                <form className="register-form" onSubmit={handleSubmit}>
                    <input value={name} className="login-input" name="username" onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name" />
                    <input value={email} className="login-input" name="email" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" id="email" required />
                    <input value={pass} className="login-input" name="password" onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" id="password" required />
                    <input value={confPass} className="login-input" name="confirmation_password" onChange={(e) => setConfPass(e.target.value)} type="password" placeholder="Confirmation Password" id="confpassword" required />
                    <button className='submit-button' type="submit">Sign Up</button>
                    <Link className="link-button" to="/login">Already have an account? Login here.</Link>
                </form>
            </div>

            {/* 
            <div className="auth-form-container">
                <h2>Register</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <label htmlFor="name" className="login-label">Full Name</label>
                    <input value={name} className="login-input" name="username" onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name" />
                    <span className="form-hint">Full name must include spaces!</span>
                    <label htmlFor="email" className="login-label">E-mail</label>
                    <input value={email} className="login-input" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" required />
                    <span className="form-hint">It should be a valid e-mail address!</span>
                    <label htmlFor="password" className="login-label">Password</label>
                    <input value={pass} className="login-input" onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                    <span className="form-hint">Password should be 8-20 characters and include at least
                        <br />1 letter, 1 number and 1 special character!</span>
                    <label htmlFor="password" className="login-label">Confirm Password</label>
                    <input value={confPass} className="login-input" onChange={(e) => setConfPass(e.target.value)} type="password" placeholder="********" id="confpassword" name="confirmation_password" required />
                    <span className="form-hint">Passwords don't match!</span>
                    <button className='submit-btn' type="submit">Sign Up</button>
                </form>
                <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
                <Link to="/login">Already have an account? Login here.</Link>
            </div> */}
        </div>
    )
}
