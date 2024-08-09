import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userProfile } from '../redux/actions/user.actions.jsx';
import User from '../components/User.jsx';
import Account from '../components/Account.jsx';
import AccountCardData from '../data/AccountCardData.json';


function UserProfile () {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();

    /* Hook useEffect pour déclencher la récupération des données utilisateur après le rendu du composant */
    useEffect(() => {
        if (token) {
            const userData = async () => {
                try {
                    /*Envoi d'une requête à l'API pour récupérer le profil utilisateur*/
                    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        /*Structure les données de l'utilisateur récupérées depuis la réponse de l'API*/
                        const userData = {
                            createdAt: data.body.createdAt,
                            updatedAt: data.body.updatedAt,
                            id: data.body.id,
                            email: data.body.email,
                            firstname: data.body.firstName,
                            lastname: data.body.lastName,
                            username: data.body.userName
                        }
                      /* Envoie les données utilisateur au Redux store via l'action userProfile*/
                        dispatch(userProfile(userData));
                    } else {
                        console.log("Erreur lors de la récupération du profil");
                    }
                } catch (error) {
                    console.error(error);
                };
            };
            userData();
        }
    }, [dispatch, token]); /*useEffect se déclenche à chaque fois que `dispatch` ou `token` change*/

    return (
        <div className='profile-page'>
            <main className='bg-dark'>
              {/* Affiche les informations de l'utilisateur via le composant User */}
                < User />
               {/* Parcourt les données du fichier JSON pour chaque compte et affiche un composant Account pour chacun */}
                {AccountCardData.map((data) => (
                    <Account 
                        key={data.id}
                        title={data.title}
                        amount={data.amount}
                        description={data.description}
                    />
                ))}
            </main>
        </div>
    )
}

export default UserProfile