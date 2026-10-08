import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './weather-integration.css';
import './pages.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
