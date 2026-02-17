import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store/store';
import './styles/style.scss'
import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactNotification from 'react-notifications-component'
import "animate.css"
import 'react-notifications-component/dist/theme.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const googleClientId: string = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';
console.log(process.env);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactNotification />
      <GoogleOAuthProvider clientId={googleClientId}>
        <App />
      </GoogleOAuthProvider>,
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();