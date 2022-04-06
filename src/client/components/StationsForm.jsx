import React from "react";

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

class StationsForm extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.onSubmit = props.onSubmit;

        this.state = {
            station_name: '',
            station_api: '',
            station_location: '',
            station_online: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const newState = {};
        // Sets newState[id] = value where id is the target form field
        newState[event.target.id || 'station_api'] = event.target.value;
        this.setState(newState);
    }

    handleCheck(event) {
        const newState = {};
        newState[event.target.id] = event.target.checked;
        this.setState(newState);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.onSubmit(this.state);
    }

    render() {
        return (
            <div className="w3-padding" style={{width: '300px'}}>
                <form onSubmit={this.handleSubmit}>
                    <div className="w3-margin-bottom">
                        <FormControl fullWidth>
                            <TextField 
                                id="station_name" 
                                label="Station Name" 
                                value={this.state.station_name} 
                                onChange={this.handleChange}
                                variant="outlined"
                                required />
                        </FormControl>
                    </div>
                    <div className="w3-margin-bottom">
                        <FormControl fullWidth>
                            <InputLabel id="station_api_label">Station API</InputLabel>      
                            <Select
                                id="station_api"
                                labelId="station_api_label"
                                value={this.state.station_api}
                                onChange={this.handleChange}
                                required >
                                <MenuItem value={'openweathermap.org'}>openweathermap.org</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="w3-margin-bottom">
                        <FormControl fullWidth>
                            <TextField 
                                id="station_location" 
                                label="Station Location" 
                                placeholder="e.g., London..."
                                value={this.state.station_location} 
                                onChange={this.handleChange}
                                variant="outlined"
                                required />
                        </FormControl>
                    </div>
                    <div className="w3-margin-bottom">
                        <FormControlLabel 
                            control={
                                <Checkbox 
                                    id="station_online"
                                    value={this.state.station_online}
                                    onChange={this.handleCheck} />
                            } 
                            label="Online"/>
                    </div>
                    <Button variant="outlined" type="submit" value="Submit">Submit</Button>
                </form>
            </div>
        );
    }
}

export default StationsForm;
