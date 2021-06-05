import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { MuiThemeProvider } from '@material-ui/core';
import { muiTheme } from './utils/theme';

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={muiTheme}>
      <App />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
