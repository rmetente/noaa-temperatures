import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import Container from './components/Container';

ReactDOM.render(
  <React.StrictMode>
      <Container />
      <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
