import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./type.actions";

/* Actions d'authentification */

/* Action pour gérer le succès de la connexion */
export const loginSuccess = (token) => {
    return {
        type: LOGIN_SUCCESS,
        payload: token,
    }
}
/*Action pour gérer l'échec de la connexion */
export const loginFailed = (error) => {
    return {
        type: LOGIN_FAIL,
        payload: error,
    }
}
/* Action pour gérer la déconnexion de l'utilisateur */
export const logout = () => {
    return {
        type: LOGOUT,
    }
} 