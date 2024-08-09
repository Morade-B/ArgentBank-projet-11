import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/images/argentBankLogo.webp';
import { logout } from '../redux/actions/auth.actions';
import './Header.css';

function Header () {
    /* Récupère l'état d'authentification (token) et le prénom de l'utilisateur à partir du store Redux */
    const isConnected = useSelector((state) => state.auth.token);
    const firstname = useSelector((state) => state.user.userData.firstname);

    const dispatch = useDispatch();
    const navigate = useNavigate();
     /* Fonction pour gérer la déconnexion de l'utilisateur */
    const logoutHandler = () => {
        dispatch(logout());
        sessionStorage.clear();
        localStorage.clear();
        navigate('/');
    }
    return (
        <main>
            <h1 className='sr-only'>Argent Bank</h1>
            <nav>
                <Link to="/">
                    <img src={Logo} alt="Bank Logo" />
                </Link> 
                {isConnected ? ( /*Si l'utilisateur est connecté, affiche les options de profil et de déconnexion*/
                    <div className='connected'>
                        <Link to='/profile'>
                            <i className='fa-solid fa-2x fa-circle-user' />
                            <p>{firstname}</p>
                        </Link>
                        <Link to='/' onClick={logoutHandler}>
                            <i className='fa-solid fa-arrow-right-from-bracket' />
                            <p> Sign out </p>
                        </Link>
                    </div>
                ) : (
                    <div className='not-connected'> {/* Si l'utilisateur n'est pas connecté, affiche le lien pour se connecter */}
                        <Link to='/login' >
                            <i className="fa-solid fa-circle-user"></i>
                            <p>Sign In</p>
                        </Link>
                    </div>
                )}
            </nav>
        </main>
    ) 
}

export default Header