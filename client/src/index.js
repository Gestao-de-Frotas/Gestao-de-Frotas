// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './route';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
        <AppRoutes />
    </Router>
);
