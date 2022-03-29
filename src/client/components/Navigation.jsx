import React from 'react';
import { NavLink } from "react-router-dom";
import Card from '@mui/material/Card';

const Navigation = () => {
    
    return (
        <Card>
            <div className="w3-bar">
                <NavLink 
                    exact="true" to="/dashboard" 
                    // Highlight link when this is the current page
                    className={({ isActive }) => 
                        (isActive ? 
                            "w3-bar-item w3-button w3-hover-none w3-text-white w3-hover-text-white" : 
                            "w3-bar-item w3-button w3-hover-none w3-text-grey w3-hover-text-white")
                    }
                >Dashboard
                </NavLink>
                <NavLink 
                    exact="true" to="/stations" 
                    className={({ isActive }) => 
                        (isActive ? 
                            "w3-bar-item w3-button w3-hover-none w3-text-white w3-hover-text-white" : 
                            "w3-bar-item w3-button w3-hover-none w3-text-grey w3-hover-text-white")
                    } 
                >Stations
                </NavLink>
            </div>
        </Card>
    );
}

export default Navigation;