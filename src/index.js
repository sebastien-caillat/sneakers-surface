import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';

import GlobalStyle from './utils/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <GlobalStyle />
            <Header />
            <Routes>
                <Route exact path='/' element={<Home />}></Route>
                <Route path='signup' element=""></Route>
                <Route path='login' element=""></Route>
                <Route path='products' element=""></Route>
            </Routes>
        </Router>
    </React.StrictMode>
)