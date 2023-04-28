import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import SSRProvider from 'react-bootstrap/SSRProvider';
import MyNavbar from './components/Navbar';
import { Provider } from 'react-redux';
import store from './store'; 



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SSRProvider>
      <Provider store={store}>
      <MyNavbar/>
    <App />
      </Provider>
    </SSRProvider>
  </React.StrictMode>
);


