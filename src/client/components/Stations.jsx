import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';

import StationsList from './StationsList.jsx';
import StationsDialog from './StationsDialog.jsx';

const Stations = () => {
    // Store row data for StationsList
    const [rows, setRows] = useState([]);

    // Get a list of all stations currently stored on the server and set 
    // this as the StationsList rows
    const fetchRows = () => {  
        fetch('/api/stations')
            .then(res => res.json())
            .then(json => {
                setRows(json.results);
            });
    }

    useEffect(() => {
        fetchRows();
        setInterval(() => {
            fetchRows(); // Update rows every 5 seconds
        }, 5000);
    }, []);

    // Update selected weather station's information on the server
    // Currently this just means toggling the 'online' state
    const handleToggle = (formState) => {
        formState.station_online = !formState.station_online;

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formState)
        };

        fetch(`/api/stations/${formState._id}`, requestOptions)
            .then(res => res.json())
            .then(json => {
                fetchRows();
            });
    }

    // Delete selected weather station's information on the server
    const handleDelete = (formState) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(`/api/stations/${formState._id}`, requestOptions)
            .then(_ => {
                fetchRows();
            });
    }

    // Add a new weather station to the server's list
    const handleAdd = (formState) => {

        console.log(formState);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formState)
        };

        fetch('/api/stations', requestOptions)
            .then(res => res.json())
            .then(res => {
                fetchRows();
            });
    };

    return (
        <Card>
            <div className="w3-margin">
                <h1>Stations</h1>
                <StationsList 
                    rows={rows} 
                    onToggle={handleToggle}
                    onDelete={handleDelete}/>
                <br/>
                <StationsDialog onSubmit={handleAdd}/>
            </div>
        </Card>
    );
};

export default Stations;