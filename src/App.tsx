import * as React from 'react';
import {unstable_createMuiStrictModeTheme as createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from '@material-ui/styles';
import {Provider} from "react-redux";

import {RootRouter} from './router/RootRouter';
import store from './store';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#4fb3be',
            main: '#00838e',
            dark: '#005661',
            contrastText: '#ffffff'
        },
        secondary: {
            light: '#c8c8c8',
            main: '#a9a9a9',
            dark: '#969696',
            contrastText: '#000000'
        },
    },
});

const App = () => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <RootRouter/>
        </ThemeProvider>
    </Provider>
)

export default App;
