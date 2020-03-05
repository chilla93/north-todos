import React from 'react';
// import logo from 'src/logo.svg';
import './App.scss';
import theme from "./theme";
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import {Home, Details} from './pages';
import { Provider } from 'react-redux';
import store, { browserHistory } from './store';
import { BrowserRouter } from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import Routes from './Routes';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';

 
function App() {
  
  return (
    <Provider store={store}>
        <ThemeProvider theme={theme}> 
          <MuiPickersUtilsProvider utils={DateFnsUtils}>       
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <ConnectedRouter history={browserHistory}>
              <Routes />
            </ConnectedRouter>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
    </Provider>

  );
}

export default App;
