import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../actions/type.actions";



/* État initial pour le reducer d'authentification*/
const initialState = {
    status: "VOID",
    isConnected: false,
    token: null,
    error: null,
}
/*Reducer pour gérer les actions liées à l'authentification*/
export const authReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                status: "SUCCEEDED",
                isConnected: true,
                token: action.payload,
                error: null
            }
        
        case LOGIN_FAIL: {
            return {
                ...state,
                status: "FAILED",
                isConnected: false,
                error: action.payload
            }
        }  
        case LOGOUT: {
            return initialState;
        }  
        default:
            return state;
    }
}