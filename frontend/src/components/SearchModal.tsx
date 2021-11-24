import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { AiOutlineClose } from 'react-icons/ai'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { utilService } from '../services/util.service';
import { TypeFlags } from 'typescript';

interface IModalProps {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchModal = ({ closeModal }: IModalProps) => {

    const globalFilterBy = useSelector((state: RootState) => state.appStateModule.filterBy)
    const [filterBy, setFilterBy] = useState(globalFilterBy)

    useEffect(() => {
        console.log('filterBy', filterBy)
    }, [filterBy])

    const [value, setValue] = React.useState<Date | null>(new Date())
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    const lalaChange = (ev: any) => {
        console.log('name', ev.target.name)
        console.log('value', ev.target.value)
    }

    const handleDateChange = (date: number | null, field: string) => {
        if(date){
            const timeStamp =  new Date(date).getTime();
            if(timeStamp > Date.now()){
                alert("Date cannot be greater than the current date")
                return
            }
            setFilterBy({...filterBy, [field]: timeStamp})
        }
    }

    return (
        <div className="modal search-modal">
            <div className="modal-header">
                <h3>Search</h3>
                <AiOutlineClose className="exit-modal-btn" onClick={() => { closeModal(false) }} />
            </div>
            <div className="modal-body">
                <Box className="modal-form" component="form" noValidate autoComplete="off" onChange={lalaChange}>
                    <TextField className="search-input" value={filterBy.searchTxt} name="searchTxt" label="Search by text" variant="outlined" />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3} className="date-filters">
                            <MobileDatePicker label="Start date" value={filterBy.startDate} onAccept={(date) => {handleDateChange(date, 'startDate')}} onChange={(date) => {}} renderInput={(params) => <TextField className="input-field" {...params} />} />
                            <MobileDatePicker label="End date" value={filterBy.endDate} onAccept={(date) => {handleDateChange(date, 'endDate')}} onChange={(date) => {}} renderInput={(params) => <TextField className="input-field" {...params} />} />
                        </Stack>
                    </LocalizationProvider>
                    <div className="input-selectors">
                        <div className="input-select">
                            <FormControl className="input-field" fullWidth>
                                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                <Select fullWidth labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Age" onChange={handleChange}>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="input-select">
                            <FormControl className="input-field" fullWidth>
                                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                <Select fullWidth labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Age" onChange={handleChange}>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </Box>
            </div>
            <div className="modal-footer">
                <Stack className="form-buttons" spacing={2} direction="row">
                    <Button variant="contained">Clear</Button>
                    <Button variant="contained">Apply</Button>
                </Stack>
            </div>
        </div>
    )
}
