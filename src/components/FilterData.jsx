import React, { useState, useEffect } from 'react';
import { Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const FilterData = ({  onFilterChange }) => {
    const [selectedMinExp, setSelectedMinExp] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedRemote, setSelectedRemote] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedMinBasePay, setSelectedMinBasePay] = useState('');

    const handleMinExpChange = (event) => {
        setSelectedMinExp(event.target.value);
        applyFilter({ minExp: event.target.value });
    };

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
        applyFilter({ location: event.target.value });
    };

    const handleRemoteChange = (event) => {
        setSelectedRemote(event.target.value);
        applyFilter({ remote: event.target.value });
    };

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
        applyFilter({ jobRole: event.target.value });
    };

    const handleMinBasePayChange = (event) => {
        setSelectedMinBasePay(event.target.value);
        applyFilter({ minBasePay: event.target.value });
    };

    const applyFilter = (filterOptions) => {
        onFilterChange({
            minExp: selectedMinExp,
            location: selectedLocation,
            jobRole: selectedRole,
            minJdSalary: selectedMinBasePay,
            ...filterOptions
        });
    };

    return (
        <div style={{ marginTop: "30px" }}>
            <Grid container spacing={1} style={{ justifyContent: "center" }}>
                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel>Min Experience</InputLabel>
                        <Select value={selectedMinExp} onChange={handleMinExpChange}>
                            <MenuItem value="">Any</MenuItem>
                            {[...Array(10)].map((_, index) => (
                                <MenuItem key={index + 1} value={index + 1}>{index + 1}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel>Location</InputLabel>
                        <Select value={selectedLocation} onChange={handleLocationChange}>
                            <MenuItem value="">Any</MenuItem>
                            <MenuItem value="delhi ncr">delhi ncr</MenuItem>
                            <MenuItem value="mumbai">mumbai</MenuItem>
                            <MenuItem value="chennai">chennai</MenuItem>
                            <MenuItem value="bangalore">bangalore</MenuItem>
                            <MenuItem value="remote">remote</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>
                
                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel>Role</InputLabel>
                        <Select value={selectedRole} onChange={handleRoleChange}>
                            <MenuItem value="">Any</MenuItem>

                            <MenuItem value="frontend">frontend</MenuItem>
                            <MenuItem value="backend">backend</MenuItem>
                            <MenuItem value="ios">ios</MenuItem>
                            <MenuItem value="android">android</MenuItem>
                            <MenuItem value="android">tech lead</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel>Min base pay</InputLabel>
                        <Select value={selectedMinBasePay} onChange={handleMinBasePayChange}>
                            <MenuItem value="">Any</MenuItem>
                            {[...Array(100)].map((_, index) => (
                                <MenuItem key={index + 1} value={index + 1}>{index + 1} USD</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    );
};

export default FilterData;
