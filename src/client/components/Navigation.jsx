import React from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

const Navigation = () => {
    
    return (
        <nav>
            <Link to="/dashboard" style={{textDecoration: 'none'}}>
                <Button variant="text">
                    Dashboard
                </Button>
            </Link>
            <Link to="/stations" style={{textDecoration: 'none'}}>
                <Button variant="text">
                    Stations
                </Button>
            </Link>
        </nav>
    );
}

export default Navigation;