import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from '../redux/reducers/auth.reducer.jsx';
import { userReducer } from '../redux/reducers/user.reducer.jsx';

const rootReducer = combineReducers({
   auth: authReducer,
   user: userReducer
})

const store = configureStore({
    reducer: rootReducer,
    devTools: true 
})




export { store };

