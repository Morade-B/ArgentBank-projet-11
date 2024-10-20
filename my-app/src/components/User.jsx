import React, { useState } from "react";/* pour gérer l'état local du composant.*/
import { useDispatch, useSelector } from "react-redux"; /* pour interagir avec le store.*/
import { updateUsername } from '../redux/actions/user.actions.jsx'; /* utilisée pour mettre à jour le nom d'utilisateur dans le store*/
import { isValidName } from "../utils/regex.jsx"; /* vérifie si le nom d'utilisateur est valide selon des règles définies.*/
import './User.css';

function User () {
    /*Permet de sélectionner des parties du store, 
    ici le token de l'utilisateur connecté et ses données personnelles (userData).*/
    const token = useSelector((state) => state.auth.token);
    const userData = useSelector((state) => state.user.userData);
   /* Contrôle l'affichage du formulaire d'édition ('false') ou du message de bienvenue ('true').*/
    const [display, setDisplay] = useState(true);
   /* Stocke le nouveau nom d'utilisateur saisi par l'utilisateur.*/
    const [userName, setUserName] = useState('');
   /* Affiche un message d'erreur si le nom d'utilisateur saisi est invalide.*/
    const [errorMessage, setErrorMessage] = useState('');
   /* Permet de dispatcher des actions, ici pour mettre à jour le nom d'utilisateur dans le store après une modification réussie.*/
    const dispatch = useDispatch();

    /* Fonction qui est exécutée lors de la soumission du formulaire pour mettre à jour le nom d'utilisateur.*/
    const handleSubmitUsername = async (event) => {
        event.preventDefault();
        /*Vérifie si le nom d'utilisateur est valide.*/
        if (!isValidName(userName)) {
            setErrorMessage("Invalid username");
            return;/*Arrête l'exécution de la fonction si le nom d'utilisateur est invalide.*/
        } else {
            /*i le nom est valide, on s'assure que le message d'erreur est vide.*/
            setErrorMessage("");
        }
        try {
            /*Requête PUT pour mettre à jour le profil de l'utilisateur avec le nouveau nom d'utilisateur*/
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({userName}),
            });
            if (response.ok) {
                const data = await response.json();
                const username = data.body.userName;
            /*  Met à jour le nom d'utilisateur dans le store.*/
                dispatch(updateUsername(username));
                /*Bascule l'affichage pour revenir à la vue initiale après une mise à jour réussie.*/
                setDisplay(!display);
            } else {
                console.log("Invalid Fields")
            }

        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <div className="header">
            {/*Utilise une condition pour choisir entre l'affichage du message de bienvenue (true) ou le formulaire d'édition (false).*/}
            { display ? 
                <div>
                    <h2>Welcome back 
                        <br />
                        {userData.firstname} {userData.lastname} !
                    </h2>
                    {/* Bouton pour basculer vers le formulaire d'édition. */}
                    <button className="edit-button" onClick={() => setDisplay(!display)}>Edit Name</button>
                </div>
                :
                <div>
                    <h2>Edit user info</h2>
                    {/* Formulaire pour modifier le nom d'utilisateur.*/}
                    <form>
                        <div className="edit-input">
                            <label htmlFor="username">User name:</label>
                            {/* Champs de saisie pour le nom d'utilisateur, désactivé pour les autres informations.*/}
                            <input
                                type="text"
                                id="username"
                                defaultValue={userData.username}
                                 /* Chaque fois que l'utilisateur tape quelque chose, 
                        setUserName est appelé avec la valeur actuelle du champ, ce qui met à jour l'état.*/
                                onChange={(event) => setUserName(event.target.value)}
                            />
                        </div>
                        <div className="edit-input">
                            <label htmlFor="firstname">First name:</label>
                            <input
                                type="text"
                                id="firstname" 
                                defaultValue={userData.firstname}
                                disabled={true} /*Champ désactivé pour empêcher la modification*/
                            />
                        </div>
                        <div className="edit-input">
                            <label htmlFor="lastname">Last name:</label>
                            <input
                                type="text"
                                id="lastname" 
                                defaultValue={userData.lastname}
                                disabled={true}
                            />
                        </div>
                        <div className="buttons">
                             {/* Bouton pour soumettre la mise à jour du nom d'utilisateur */}
                            <button className="edit-username-button" onClick={handleSubmitUsername}>Save</button>
                            {/* Bouton pour annuler la modification et revenir à l'affichage initial */}
                            <button className="edit-username-button" onClick={() => setDisplay(!display)}>Cancel</button>
                        </div>
                          {/* Affichage du message d'erreur en cas de saisie invalide */}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
            }
        </div>
    )
}

export default User