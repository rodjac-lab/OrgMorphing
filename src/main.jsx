import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import CardsDemo from '../pages/cards-demo.tsx';
import './styles/variables.css';
import './styles/globals.css';

const normalizedPath =
  window.location.pathname.replace(/\/+$/, '') || '/';
const isCardsDemo = normalizedPath === '/cards-demo';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isCardsDemo ? <CardsDemo /> : <App />}
  </React.StrictMode>
);
