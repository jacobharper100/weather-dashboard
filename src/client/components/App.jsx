import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes, Navigate } from "react-router-dom";

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
                    <div className="w3-margin-top">
                        <Routes>
                            <Route 
                                path="/stations" 
                                element={<Stations/>}/>
                            <Route 
                                path="*" 
                                element={<Navigate replace to="/stations"/>}/>
                        </Routes>
                    </div>
                </div>
        </ThemeProvider>
    );
};

export default App;