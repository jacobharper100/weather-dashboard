import React from 'react';
import Card from '@mui/material/Card';

import StationsList from './StationsList.jsx';

const Stations = () => {
    return (
        <Card>
            <div className="w3-margin">
                <h1>Stations</h1>  
                <StationsList/>  
            </div>
        </Card>
    );
};

export default Stations;