import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import Error from './pages/Error.jsx';
import './main.css';
import { RootState } from './app/store'; 



export default function App () {
    const isConnected = useSelector((state: RootState) => state.auth.isConnected);

    return (
        <div>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='login' element={<Login />} />
                <Route 
                    path='profile' 
                    element={isConnected ? <Profile /> : <Navigate to="/login" />} 
                />
                <Route path='*' element={<Error />} />
            </Routes>
            <Footer />
        </div>
    )  
}