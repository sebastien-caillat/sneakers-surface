import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Signup from './pages/Signup';

import GlobalStyle from './utils/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <GlobalStyle />
            <Header />
            <Routes>
                <Route exact path='/' element={<Home />}></Route>
                <Route path='signup' element={<Signup />}></Route>
                <Route path='signin' element=""></Route>
                <Route path='products' element=""></Route>
            </Routes>
        </Router>
    </React.StrictMode>
)