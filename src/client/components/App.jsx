import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes, Navigate } from "react-router-dom";

import Navigation from './Navigation.jsx';
import Dashboard from './Dashboard.jsx';
import Stations from './Stations.jsx';
import Error from './Error.jsx';

const App = () => {

    // Obtain dark-mode preference from the browser
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(() =>
        createTheme({
            palette: {
                mode: prefersDarkMode ? 'dark' : 'light',
            },
        }),
        [prefersDarkMode],
    );

    return ( 
        <ThemeProvider theme={theme}>
            <CssBaseline/>
                <div className="w3-margin">
                    <Navigation/>
                    <div className="w3-margin-top">
                        <Routes>
                            <Route path="/" element={<Navigate replace to="/dashboard"/>}/>
                            <Route path="/dashboard" element={<Dashboard/>}/>
                            <Route path="/stations" element={<Stations/>}/>
                            <Route path="*" element={<Error/>}/>
                        </Routes>
                    </div>
                </div>
 
        </ThemeProvider>
    );
};

export default App;