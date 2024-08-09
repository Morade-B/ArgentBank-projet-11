import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsername } from '../redux/actions/user.actions.jsx';
import { isValidName } from "../utils/regex.jsx";
import './User.css';

function User () {
    /*Récupère le token et les données de l'utilisateur connecté à partir du state Redux*/
    const token = useSelector((state) => state.auth.token);
    const userData = useSelector((state) => state.user.userData);
  
    const [display, setDisplay] = useState(true);
   
    const [userName, setUserName] = useState('');
   
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();

    /*Fonction asynchrone pour gérer la soumission du formulaire de modification du nom d'utilisateur*/
    const handleSubmitUsername = async (event) => {
        event.preventDefault();
        if (!isValidName(userName)) {
            setErrorMessage("Invalid username");
            return;
        } else {
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
            
                dispatch(updateUsername(username));
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
            { display ? 
                <div>
                    <h2>Welcome back 
                        <br />
                        {userData.firstname} {userData.lastname} !
                    </h2>
                    {/* Bouton pour afficher le formulaire de modification du nom d'utilisateur */}
                    <button className="edit-button" onClick={() => setDisplay(!display)}>Edit Name</button>
                </div>
                :
                <div>
                    <h2>Edit user info</h2>
                    <form>
                        <div className="edit-input">
                            <label htmlFor="username">User name:</label>
                            <input
                                type="text"
                                id="username"
                                defaultValue={userData.username}
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