import * as React from 'react';
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from '@material-ui/styles';

import {RootRouter} from './components/router/RootRouter';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#238f80',
            main: '#007569',
            dark: '#005b4f',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#ff8a50',
            main: '#ff5722',
            dark: '#c41c00',
            contrastText: '#fafafa',
        },
    },
});

const App = () => (
    <ThemeProvider theme={theme}>
        <RootRouter/>
    </ThemeProvider>
)

export default App;
