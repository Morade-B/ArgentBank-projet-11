import React, { useState } from 'react'; /*pour gérer l'état local dans le composant.*/
import { useDispatch } from 'react-redux'; /* permet d'envoyer des actions pour modifier l'état global.*/
import { useNavigate } from 'react-router-dom'; /* permet de naviguer entre les pages.*/
import { loginFailed, loginSuccess } from '../redux/actions/auth.actions.jsx'; /* pour gérer le succès ou l'échec de la connexion.*/
import { isValidEmail, isValidPassword } from '../utils/regex.jsx'; /*utilise une expression régulière (regex) 
pour vérifier si l'adresse e-mail et le mdp respecte le bon format.*/
import './Form.css';

function Form () {
    /* Permet de récupérer les données saisies par l'utilisateur dans le formulaire */

    /* useState: Gère l'état local( stocker et de manipuler des données spécifiques à un composant.) 
    pour l'email, le mot de passe, l'option "Remember Me" et les messages d'erreur.*/
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    /* Permet de rediriger l'utilisateur vers une autre page après la connexion.*/
    const navigate = useNavigate();
    /* Permet d'envoyer des actions au store Redux pour mettre à jour l'état global.*/
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
             /* Envoie une requête POST au serveur pour tenter de se connecter avec les informations saisies par l'utilisateur. */
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });
            if (response.ok) {
                const data = await response.json();
            /*Le jeton (token) est extrait de la réponse, et l'action loginSuccess est dispatchée pour mettre à jour l'état global. 
             Le jeton est également stocké dans sessionStorage et localStorage si l'utilisateur souhaite se souvenir de lui.*/
                const token = data.body.token;
                dispatch(loginSuccess(token));
                sessionStorage.setItem("token", token);
                if (rememberMe) {
                    localStorage.setItem("token", token);
                }
                navigate('/profile');
            } else {
                /* Si la réponse échoue: Une action loginFailed est dispatchée avec un message d'erreur.*/
                const error = "Incorrect email/password"
                dispatch(loginFailed(error));
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
         /*handleSubmit: Appelé lors de la soumission du formulaire pour traiter la connexion.*/
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
                        /* Chaque fois que l'utilisateur tape quelque chose, 
                        setEmail est appelé avec la valeur actuelle du champ, ce qui met à jour l'état.*/
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