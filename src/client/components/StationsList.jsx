import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

const columns = [
    { 
        field: 'id', 
        headerName: 'ID', 
        width: 90 
    },
    {
      field: 'stationName',
      headerName: 'Station Name',
      width: 150,
    },
    {
        field: 'online',
        headerName: 'Status',
        width: 100,
        sortable: false,
        renderCell: (params) => {
            
            const api = params.api;
            const thisRow = {};
    
            api.getAllColumns()
                .filter((c) => c.field !== "__check__" && !!c)
                .forEach((c) => {
                    thisRow[c.field] = params.getValue(params.id, c.field)
                });

            return <Chip label={thisRow.online ? "Online" : "Offline"} color={thisRow.online ? "success" : "error"} />
        },
    },
    {
        field: "action",
        headerName: 'Action',
        width: 150,
        sortable: false,
        renderCell: (params) => {
            const onClick = (e) => {
                e.stopPropagation();
    
                const api = params.api;
                const thisRow = {};
    
                api.getAllColumns()
                    .filter((c) => c.field !== "__check__" && !!c)
                    .forEach((c) => {
                        thisRow[c.field] = params.getValue(params.id, c.field)
                    });
    
                return alert(JSON.stringify(thisRow, null, 4));
            }
            return <Button variant="outlined" onClick={onClick}>Toggle Active</Button>;
        },
    },
];
  
const rows = [
    { id: 1, stationName: 'Ottawa', online: false },
    { id: 2, stationName: 'Vancouver', online: false },
    { id: 3, stationName: 'Toronto', online: false },
    { id: 4, stationName: 'Montreal', online: true },
    { id: 5, stationName: 'Edmonton', online: false },
    { id: 6, stationName: 'Calgary', online: false },
    { id: 7, stationName: 'Victoria', online: false },
];

const StationsList = () => {
    return (
        <DataGrid
            autoHeight={true}
            columns={columns}
            disableColumnMenu
            disableColumnSelector
            disableDensitySelector
            disableSelectionOnClick
            pageSize={10}
            rows={rows}
        />
    );
};

export default StationsList;