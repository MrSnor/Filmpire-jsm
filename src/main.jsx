import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';

import App from './components/App';
import store from './app/store';
// import './index.css';

const theme = createTheme({});

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    {/* store contains state of the whole app */}
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>

    </Provider>

  </React.StrictMode>,
);
