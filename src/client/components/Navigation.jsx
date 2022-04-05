import React from 'react';
import { NavLink } from "react-router-dom";
import Card from '@mui/material/Card';

const Navigation = () => {
    
    // Set link highlight class for active navigation link
    const setActiveClass = (isActive) => {
        const base = "w3-bar-item w3-button w3-hover-none w3-hover-text-white ";
        return isActive ? 
            base + "w3-text-white" : 
            base + "w3-text-grey";
    }

    return (
        <Card>
            <div className="w3-bar">
                <NavLink 
                    exact="true" to="/dashboard" 
                    className={({ isActive }) => setActiveClass(isActive)}
                >Dashboard
                </NavLink>
                <NavLink 
                    exact="true" to="/stations" 
                    className={({ isActive }) => setActiveClass(isActive)}
                >Stations
                </NavLink>
            </div>
        </Card>
    );
};

export default Navigation;