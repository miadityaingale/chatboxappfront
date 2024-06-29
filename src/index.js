import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './rotues';
import { Provider } from 'react-redux'
import { store } from './redux/store';
// import { SocketProvider } from './context/SocketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
      <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
