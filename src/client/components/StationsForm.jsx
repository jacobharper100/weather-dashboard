import React from "react";

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

class StationsForm extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            station_name: '',
            station_api: '',
            station_city: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const newState = {};
        newState[event.target.id || 'station_api'] = event.target.value
        this.setState(newState);
    }

    handleSubmit(event) {
        alert(JSON.stringify(this.state));
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                
                <FormControl fullWidth>
                <TextField 
                    id="station_name" 
                    label="Station Name" 
                    value={this.state.station_name} 
                    onChange={this.handleChange}
                    variant="outlined"
                    required />
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="station_api_label">Station API</InputLabel>      
                    <Select
                        id="station_api"
                        labelId="station_api_label"
                        value={this.state.station_api}
                        onChange={this.handleChange}
                        required >
                        <MenuItem value={'weather.com'}>weather.com</MenuItem>
                    </Select>
                </FormControl>
                
                <TextField 
                    id="station_city" 
                    label="Station City" 
                    value={this.state.station_city} 
                    onChange={this.handleChange}
                    variant="outlined"
                    required />

                <Button variant="outlined" type="submit" value="Submit">Submit</Button>
            </form>
        );
    }
}

export default StationsForm;
