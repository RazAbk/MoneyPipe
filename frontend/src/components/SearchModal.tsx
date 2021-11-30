import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
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
import { IDataObject } from '../interfaces/dataInterfaces';
import { setFilterBy as setGlobalFilterBy } from '../store/actions/app-state.action'
import { utilService } from '../services/util.service';
import { setCurrentLabel } from '../store/actions/app-state.action';

interface IModalProps {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const emptyFilterBy = {
    category: "",
    startDate: utilService.getCurrMonthStartTimeStamp(),
    endDate: utilService.getDayMaxHour(Date.now()),
    label: "",
    searchTxt: ""
}

export const SearchModal = ({ closeModal }: IModalProps) => {

    const dispatch = useDispatch()
    const globalFilterBy = useSelector((state: RootState) => state.appStateModule.filterBy)
    const rawData: IDataObject = useSelector((state: RootState) => state.userModule.data)

    const [filterBy, setFilterBy] = useState(globalFilterBy)


    const handleChange = (ev: SelectChangeEvent | any) => {
        setFilterBy({ ...filterBy, [ev.target.name]: ev.target.value })
    };

    const handleDateChange = (date: number | null, field: string) => {
        if (date) {
            const timeStamp = new Date(date).getTime();
            if (timeStamp > Date.now()) {
                alert("Date cannot be greater than the current date")
                return
            } else if (filterBy.startDate > filterBy.endDate) {
                alert("Start date cannot be greater than end date")
                return
            }
            setFilterBy({ ...filterBy, [field]: field === 'endDate' ? utilService.getDayMaxHour(timeStamp) : timeStamp })
        }
    }

    const handleApply = () => {
        dispatch(setGlobalFilterBy(filterBy))
        dispatch(setCurrentLabel(filterBy.label))
        closeModal(false)
    }

    return (
        <div className="modal search-modal">
            <div className="modal-header">
                <h3>Search</h3>
                <AiOutlineClose className="exit-modal-btn" onClick={() => { closeModal(false) }} />
            </div>
            <div className="modal-body">
                <TextField className="txt-input" value={filterBy.searchTxt} name="searchTxt" onChange={handleChange} label="Search by text" variant="outlined" />
                <Box className="modal-form" component="form" noValidate autoComplete="off" onChange={handleChange}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3} className="date-filters">
                            <MobileDatePicker label="Start date" value={filterBy.startDate} onAccept={(date) => { handleDateChange(date, 'startDate') }} onChange={(date) => { }} renderInput={(params) => <TextField className="input-field" {...params} />} />
                            <MobileDatePicker label="End date" value={filterBy.endDate} onAccept={(date) => { handleDateChange(date, 'endDate') }} onChange={(date) => { }} renderInput={(params) => <TextField className="input-field" {...params} />} />
                        </Stack>
                    </LocalizationProvider>
                    <div className="input-selectors">
                        <div className="input-select">
                            <FormControl className="input-field" fullWidth>
                                <InputLabel id="category">Category</InputLabel>
                                <Select fullWidth labelId="category" id="category" value={filterBy.category} label="Category" name="category" onChange={handleChange}>
                                    {rawData && rawData.categories.map(category => <MenuItem key={`cat-filter-${category.title}`} value={category.title}>{category.title}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="input-select">
                            <FormControl className="input-field" fullWidth>
                                <InputLabel id="label">Label</InputLabel>
                                <Select fullWidth labelId="label" id="label" value={filterBy.label} label="Label" name="label" onChange={handleChange}>
                                    {rawData && rawData.labels.map(label => <MenuItem key={`lab-filter-${label.labelName}`} value={label.labelName}>{label.title}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </Box>
                <Stack className="form-buttons" spacing={2} direction="row">
                    <Button variant="contained" onClick={() => { setFilterBy(emptyFilterBy) }}>Clear</Button>
                    <Button variant="contained" onClick={() => { handleApply() }}>Apply</Button>
                </Stack>
            </div>
        </div>
    )
}
