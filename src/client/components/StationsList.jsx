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
        field: 'status',
        headerName: 'Status',
        width: 100,
        sortable: false,
        renderCell: () => <Chip label="Online" color="success" />,
    },
    {
        field: "action",
        headerName: 'Action',
        width: 100,
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
            return <Button onClick={onClick}>Click</Button>;
        },
    },
];
  
const rows = [
    { id: 1, stationName: 'Ottawa' },
    { id: 2, stationName: 'Vancouver' },
    { id: 3, stationName: 'Toronto' },
    { id: 4, stationName: 'Montreal' },
    { id: 5, stationName: 'Edmonton' },
    { id: 6, stationName: 'Calgary' },
    { id: 7, stationName: 'Victoria' },
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