import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes, Link, Navigate } from "react-router-dom";
import Dashboard from './Dashboard.jsx';
import Stations from './Stations.jsx';
import Navigation from './Navigation.jsx';
import Error from './Error.jsx';

const App = () => {

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(() =>
        createTheme({
            palette: {
                mode: prefersDarkMode ? 'dark' : 'light',
            },
        }),
        [prefersDarkMode],
    );
    
    // const [pingResponse, setPingResponse] = useState("");
    // const pingBackend = () => {
    //     fetch("/api/ping", {
    //         method: "GET",
    //     }).then((response) => {
    //         response.text().then(text => {
    //             setPingResponse(text);
    //         }).catch((err) => {
    //             console.log(err)
    //         });
    //     });
    // };

    return ( 
        <ThemeProvider theme={theme}>
            <CssBaseline/>
                <Navigation/>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/dashboard"/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/stations" element={<Stations/>}/>
                    <Route path="*" element={<Error/>}/>
                </Routes>
 
        </ThemeProvider>
    );
};

export default App;