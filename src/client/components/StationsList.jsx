import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Chip from '@mui/material/Chip';

const StationsList = (props) => {

    // Destructure toggle and delete handlers from props
    const { onToggle, onDelete } = props;

    // Column definitions
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 25,
        },
        {
          field: 'station_name',
          headerName: 'Station Name',
          width: 100,
        },
        {
            field: 'station_location',
            headerName: 'Location',
            width: 100,
        },
        {
            field: 'station_api',
            headerName: 'API',
            width: 150,
        },
        {
            field: 'station_weather',
            headerName: 'Weather',
            width: 100,
        },
        {
            field: 'station_temp',
            headerName: 'Temperature',
            width: 100,
        },
        {
            field: 'station_pressure',
            headerName: 'Pressure',
            width: 100,
        },
        {
            field: 'station_humidity',
            headerName: 'Humidity',
            width: 100,
        },
        {
            field: 'station_online',
            headerName: 'Status',
            width: 90,
            sortable: false,
            renderCell: (params) => {
                const stationOnline = params.row.station_online;
                return <Chip 
                    label={stationOnline ? "Online" : "Offline"} 
                    color={stationOnline ? "success" : "error"} />
            },
        },
        {
            field: "buttonActions",
            headerName: '',
            width: 190,
            sortable: false,
            renderCell: (params) => {

                const toggleOnline = (event) => {
                    event.stopPropagation();
                    onToggle(params.row);
                }
                
                const deleteRow = (event) => {
                    event.stopPropagation();
                    onDelete(params.row);
                }
    
                return (
                    <ButtonGroup color="error">
                        <Button 
                            variant="outlined"  
                            onClick={toggleOnline}>Toggle</Button>
                        <Button 
                            variant="contained" 
                            onClick={deleteRow}>Delete</Button>
                    </ButtonGroup>
                );
            },
        }
    ];

    return (
        <DataGrid
            autoHeight={true}
            columns={columns}
            disableColumnMenu
            disableColumnSelector
            disableDensitySelector
            disableSelectionOnClick
            pageSize={10}
            rowsPerPageOptions={[10]}
            rows={props.rows}
            getRowId={(row) => row._id}
        />
    );
};

export default StationsList;