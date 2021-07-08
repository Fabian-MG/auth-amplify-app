import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/user';
Amplify.configure(awsconfig)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);