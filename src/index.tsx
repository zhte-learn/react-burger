import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/components/app/app';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers';
import reportWebVitals from './reportWebVitals';
import { store } from './services/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();