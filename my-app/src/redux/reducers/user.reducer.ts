import { GET_USERPROFILE, EDIT_USERNAME, LOGOUT } from "../actions/type.actions"

/* État initial du reducer utilisateur */
const initialState = {
    status: 'VOID',
    userData: {}
}
/*Reducer pour gérer les actions liées aux données utilisateur*/
export const userReducer = (state = initialState, action: { type: any; payload: any } ) => {
    switch (action.type) {
        case GET_USERPROFILE:
            return {
                ...state,
                status: 'SUCCEEDED',
                userData: action.payload
            }
        case EDIT_USERNAME: 
            return {
                ...state,
                status: "MODIFIED",
                userData: {
                    ...state.userData,
                    username: action.payload
                } 
            } 
        case LOGOUT: {
            return initialState;  
        }   
        default:
            return state;    
    }
}

        