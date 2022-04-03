import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Chip from '@mui/material/Chip';

const getCurrentRow = (params) => {
    const api = params.api;
    const currentRow = {};

    api.getAllColumns()
        .filter((c) => c.field !== "__check__" && !!c)
        .forEach((c) => {
            currentRow[c.field] = params.getValue(params.id, c.field)
        });
    return currentRow;
}

const StationsList = (props) => {
    
    const { onToggle, onDelete } = props;

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 25,
          },
        {
          field: 'station_name',
          headerName: 'Station Name',
          width: 150,
        },
        {
            field: 'station_location',
            headerName: 'Location',
            width: 225,
        },
        {
            field: 'station_api',
            headerName: 'API',
            width: 125,
        },
        {
            field: 'station_online',
            headerName: 'Status',
            width: 100,
            sortable: false,
            renderCell: (params) => {
                const currentRow = getCurrentRow(params);
                return <Chip label={currentRow.station_online ? "Online" : "Offline"} color={currentRow.station_online ? "success" : "error"} />
            },
        },
        {
            field: "buttonActions",
            headerName: '',
            width: 185,
            sortable: false,
            renderCell: (params) => {
                const toggleOnline = (event) => {
                    event.stopPropagation();
                    onToggle(getCurrentRow(params));
                }
    
                const deleteRow = (event) => {
                    event.stopPropagation();
                    onDelete(getCurrentRow(params));
                }
    
                return (
                    <ButtonGroup color="error">
                        <Button variant="outlined"  onClick={toggleOnline}>Toggle</Button>
                        <Button variant="contained" onClick={deleteRow}>Delete</Button>
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
        />
    );
}

export default StationsList;