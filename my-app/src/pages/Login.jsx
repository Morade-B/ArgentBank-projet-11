import React from 'react';
import Form from '../components/Form.jsx';
import './Login.css';

/* Login page */
function Login () {
    return (
        <div className='signin-page'>
            <main className='bg-dark'>
                {/* Retourne composant form */}
                < Form />
            </main>
        </div>
        
    )
}

export default Login;