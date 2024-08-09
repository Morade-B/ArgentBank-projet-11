import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { authReducer } from './reducers/auth.reducer';
import { userReducer } from './reducers/user.reducer';


/*Combine les différents reducers pour créer un reducer racine*/
const rootReducer = combineReducers({
   auth: authReducer, /*Réduit les actions liées à l'authentification*/
   user: userReducer  /*Réduit les actions liées aux données utilisateur*/
})
/*Configure le store Redux avec le reducer racine*/
export const store = configureStore({
    reducer: rootReducer, /*Utilise le reducer combiné pour gérer l'état global*/
    devTools: true  /*Active les outils de développement Redux pour déboguer facilement l'état*/
})

export type RootState= ReturnType<typeof store.getState >




