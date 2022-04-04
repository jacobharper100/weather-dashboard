import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes, Navigate } from "react-router-dom";

import Navigation from './Navigation.jsx';
import Dashboard from './Dashboard.jsx';
import Stations from './Stations.jsx';

const App = () => {

    // Enforce dark-mode on React MUI components
    const theme = React.useMemo(() =>
        createTheme({
            palette: {
                mode: 'dark'
            },
        }),
    );

    return (
        <ThemeProvider theme={theme}>
            {/* Apply theme */}
            <CssBaseline/>
                <div className="w3-margin">
                    <Navigation/>
                    <div className="w3-margin-top">
                        <Routes>
                            <Route 
                                path="/" 
                                element={<Navigate replace to="/dashboard"/>}/>
                            <Route 
                                path="/dashboard"  
                                element={<Dashboard/>}/>
                            <Route 
                                path="/stations" 
                                element={<Stations/>}/>
                            {/* Custom 404 Page <Route 
                                path="*" 
                                element={<Error/>}/>*/}
                        </Routes>
                    </div>
                </div>
        </ThemeProvider>
    );
};

export default App;