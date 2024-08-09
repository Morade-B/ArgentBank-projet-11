import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginFailed, loginSuccess } from '../redux/actions/auth.actions.jsx';
import { isValidEmail, isValidPassword } from '../utils/regex.jsx';
import './Form.css';

function Form () {
    /* Permet de récupérer les données saisies par l'utilisateur dans le formulaire */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    /* Indique un message d'erreur si les données ne sont pas valides */
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

/* Fonction qui est appelée lors de la soumission du formulaire */
    const handleSubmit = async (event) => {
        event.preventDefault();
        /* Validation de l'email et du mot de passe */
        if (!isValidEmail(email)) {
            setErrorMessage("Invalid email adress");
            return;
        }
        if (!isValidPassword(password)) {
            setErrorMessage("Invalid password");
            return;
        }
        try {
             /* Envoie une requête POST au serveur pour tenter de se connecter */
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });
            if (response.ok) {
                const data = await response.json();
             
                const token = data.body.token;
                dispatch(loginSuccess(token));
                sessionStorage.setItem("token", token);
                if (rememberMe) {
                    localStorage.setItem("token", token);
                }
                navigate('/profile');
            } else {
                const error = "Incorrect email/password"
                dispatch(loginFailed(error));
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className='sign-in-content'>
            <i className="fa-solid fa-circle-user"></i>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div className='input-wrapper'>
                    <label htmlFor='email'>Email</label>
                    <input 
                        id='email' 
                        type='text'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='input-wrapper'>
                    <label htmlFor='password'>Password</label>
                    <input 
                        id='password' 
                        type='password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className='input-remember'>
                    <input 
                        id='remember-me' 
                        type='checkbox' 
                        checked={rememberMe}
                        onChange={(event) => setRememberMe(event.target.checked)}
                    />
                    <label htmlFor='remember-me'>Remember me</label>
                </div>
                <button className="sign-in-button">
                    Sign In
                </button>
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
            </form>
        </section>
    )
}

export default Form