import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import Products from './pages/Products';
import ProductInfos from './pages/ProductInfos';
import Error from './components/Error';

import GlobalStyle from './utils/GlobalStyle';
import { AuthProvider } from "./components/AuthProvider/AuthProvider";
import { getToken } from './helpers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <Router>
                <GlobalStyle />
                <Header />
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/signin' element={<Signin />} />
                    <Route path='/profile/:username' element={getToken() ? <Profile /> : <Navigate to='/signin' />} />
                    <Route path='products' element={<Products />}></Route>
                    <Route path='product/:id' element={<ProductInfos />}></Route>
                    <Route path='*' element={<Error />}></Route>
                </Routes>
            </Router>
        </AuthProvider>
    </React.StrictMode>
)