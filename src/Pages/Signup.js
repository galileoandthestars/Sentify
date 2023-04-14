import React, { useState } from "react";

export const SignUp = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [confPass, setConfPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="register-page">
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name" className="login-label">Full name</label>
            <input value={name} className="login-input" name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name"  required pattern="^[a-zA_ ]*$"/>
            <span className="form-hint">Full name must include spaces!</span>
            <label htmlFor="email" className="login-label">E-mail</label>
            <input value={email} className="login-input" onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" required/>
            <span className="form-hint">It should be a valid e-mail address!</span>
            <label htmlFor="password" className="login-label">Password</label>
            <input value={pass} className="login-input" onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$"/>
            <span className="form-hint">Password should be 8-20 characters and include at least
             <br/>1 letter, 1 number and 1 special character!</span>
            <label htmlFor="password" className="login-label">Confirm Password</label>
            <input value={confPass} className="login-input" onChange={(e) => setConfPass(e.target.value)} type="password" placeholder="********" id="confpassword" name="confpassword" required />
            <span className="form-hint">Passwords don't match!</span>
            <button className='submit-btn' type="submit">Sign Up</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    </div>
    )
}