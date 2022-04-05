import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';

import StationsList from './StationsList.jsx';
import StationsDialog from './StationsDialog.jsx';

const Stations = () => {

    const [rows, setRows] = useState([]);

    const fetchRows = () => {
        fetch('/api/stations')
            .then(res => res.json())
            .then(json => {
                setRows(json.results);
            });
    }

    useEffect(() => {
        fetchRows();
    }, [])

    const handleToggle = (row) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(row)
        };

        fetch('/api/stations', requestOptions)
            .then(res => res.json())
            .then(json => {
                fetchRows();
            });
    }

    const handleDelete = (row) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(row)
        };

        fetch('/api/stations', requestOptions)
            .then(res => res.json())
            .then(json => {
                fetchRows();
            });
    }

    const handleAdd = (formState) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formState)
        };

        fetch('/api/stations', requestOptions)
            .then(res => res.json())
            .then(json => {
                setRows([...rows, json.results]);
            });
    };

    return (
        <Card>
            <div className="w3-margin">
                <h1>Stations</h1>
                <StationsList rows={rows} onToggle={handleToggle} onDelete={handleDelete}/>
                <br/>
                <StationsDialog onSubmit={handleAdd}/>
            </div>
        </Card>
    );
};

export default Stations;