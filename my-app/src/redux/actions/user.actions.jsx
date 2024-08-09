import { GET_USERPROFILE, EDIT_USERNAME } from "./type.actions";

/* Action pour mettre à jour les informations du profil utilisateur*/
export const userProfile = (userData) => {
    return {
        type: GET_USERPROFILE,
        payload: userData,
    }
}


/* Action pour mettre à jour le nom d'utilisateur*/
export const updateUsername = (username) => {
    return {
        type: EDIT_USERNAME,
        payload: username,
    }
}