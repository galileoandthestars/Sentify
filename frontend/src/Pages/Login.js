import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import useToken from '../components/useToken';

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
                <Navbar.Brand href=""><Link to="/">Sentify</Link></Navbar.Brand>
            </Navbar>
            <div className="auth-form-container">
                <h2>Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email" className="login-label">email</label>
                    <input value={email} className="login-input" onChange={(e) => setEmail(e.target.value)} placeholder="youremail@gmail.com" id="email" name="email" />
                    <label htmlFor="password" className="login-label">password</label>
                    <input value={pass} className="login-input" onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                    <button className="submit-btn" type="submit">Log In</button>
                </form>
                {/* <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button> */}
                <Link to="/register">Don't have an account? Register here.</Link>
            </div>
        </div>
    )
}
