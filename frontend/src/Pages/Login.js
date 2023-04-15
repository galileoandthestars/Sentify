import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
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
                    <input value={email} className="login-input" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                    <label htmlFor="password" className="login-label">password</label>
                    <input value={pass} className="login-input" onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                    <Link to="/dashboard"><button className="submit-btn" type="submit">Log In</button></Link>
                </form>
                {/* <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button> */}
                <Link to="/signup">Don't have an account? Register here.</Link>
            </div>
        </div>
    )
}