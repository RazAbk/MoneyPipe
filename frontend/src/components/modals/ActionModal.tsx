import { Theme, useTheme } from '@mui/material/styles';
import { Button, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { IAction, IDataObject, IFilterBy } from '../../interfaces/dataInterfaces'
import { RootState } from '../../store/store'
import { addAction } from '../../store/actions/user.action';
import { CategoryModal } from './CategoryModal';
import { LabelModal } from './LabelModal';
import { MobileDateTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { setLoader } from '../../store/actions/app-state.action';
import { ReactDimmer } from 'react-dimmer';

interface IActionModalProps {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IErrors {
    description: boolean,
    category: boolean,
    amount: boolean
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(title: string, labels: readonly string[], theme: Theme) {
    return {
        fontWeight:
            labels.indexOf(title) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export const ActionModal = ({ closeModal }: IActionModalProps) => {

    const selectedAction: IAction | null = useSelector((state: RootState) => state.appStateModule.selectedAction)
    const data: IDataObject = useSelector((state: RootState) => state.userModule.data)
    const filterBy: IFilterBy = useSelector((state: RootState) => state.appStateModule.filterBy)
    const dispatch = useDispatch()
    const theme = useTheme();

    const [formData, setFormData] = useState<IAction>(selectedAction || {
        _id: '',
        type: 'expense',
        labels: [],
        category: '',
        description: '',
        amount: 0,
        createdAt: Date.now()
    })

    const [errors, setErrors] = useState({
        description: false,
        category: false,
        amount: false
    })

    const [addCategoryModal, setAddCategoryModal] = useState(false)
    const [addLabelModal, setAddLabelModal] = useState(false)

    const handleChange = (ev: any) => {
        setFormData({ ...formData, [ev.target.name]: ev.target.value })
    }

    const handleLabelsChange = (ev: any) => {
        const labels = ev.target.value
        const formDataCopy = { ...formData, labels: typeof labels === 'string' ? labels.split(',') : labels }
        setFormData(formDataCopy)
    }

    const handleDateChange = (date: number | null) => {
        if (date) {
            const currentTimeStamp = new Date(date).getTime();
            setFormData({...formData, createdAt: currentTimeStamp})
            // if (timeStamp > Date.now()) {
            //     alert("Date cannot be greater than the current date")
            //     return
            // } else{
            //     setFormData({...formData, createdAt: timeStamp})
            // }
        }
    }

    const onSubmit = async () => {
        let isValid = true

        const errorsCopy = { ...errors }
        for (const key in errors) {
            if (!formData[key as keyof IAction]) {
                isValid = false
                errorsCopy[key as keyof IErrors] = true
            } else if (key === 'amount' && formData.amount <= 0) {
                isValid = false
                errorsCopy.amount = true
            } else {
                errorsCopy[key as keyof IErrors] = false
            }
        }

        if (!isValid) {
            setErrors(errorsCopy)
            return
        } else {
            dispatch(setLoader(true))
            await dispatch(addAction(formData, filterBy))
            dispatch(setLoader(false))
            closeModal(false)
        }
    }

    return (
        <>
            <div className="modal action-add-edit-modal">
                <div className="modal-header">
                    <h3>{selectedAction ? 'Edit action' : 'Add new action'}</h3>
                    <AiOutlineClose className="exit-modal-btn" onClick={() => { closeModal(false) }} />
                </div>
                <div className="modal-body">
                    <TextField autoComplete="off" className="txt-input" error={errors.description} value={formData.description} name="description" onChange={handleChange} label="Description" variant="outlined" />
                    <Box className="modal-form" component="form" noValidate autoComplete="off" onChange={handleChange}>
                        <div className="input-selectors">
                            <div className="input-select">
                                <FormControl className="input-field" fullWidth>
                                    <InputLabel id="type">Type</InputLabel>
                                    <Select fullWidth labelId="type" id="type" value={formData.type} label="Type" name="type" onChange={handleChange}>
                                        <MenuItem key="type-expense" value={'expense'}>Expense</MenuItem>
                                        <MenuItem key="type-income" value={'income'}>Income</MenuItem>
                                        <MenuItem key="type-investment" value={'investment'}>Investment</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="input-select">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3}>
                                        <MobileDateTimePicker label="Date & Time" ampm={false} inputFormat="dd/MM/yyyy HH:mm" value={formData.createdAt} onAccept={(date) => {handleDateChange(date)}} onChange={(date) => { }} renderInput={(params) => <TextField autoComplete="off" className="input-field" {...params} />} />
                                    </Stack>
                                </LocalizationProvider>

                            </div>
                            <div className="inner-group">
                                <div className="input-select">
                                    <FormControl className="input-field" fullWidth>
                                        <InputLabel id="category">Category</InputLabel>
                                        <Select fullWidth labelId="category" id="category" error={errors.category} value={formData.category} label="Category" name="category" onChange={handleChange}>
                                            {data && data.categories.map(category => <MenuItem key={category._id} value={category.title}>{category.title}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    <Button variant="contained" onClick={() => { setAddCategoryModal(true) }}>Add</Button>
                                </div>
                                <div className="input-select">
                                    <FormControl className="input-field" fullWidth>
                                        <InputLabel id="label">Labels</InputLabel>
                                        <Select id="multiple-labels" multiple value={formData.labels} onChange={handleLabelsChange}
                                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', overflowX: 'auto', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} />
                                                    ))}
                                                </Box>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {data.labels.map((label) => (
                                                <MenuItem
                                                    key={'options-' + label._id}
                                                    value={label.labelName}
                                                    style={getStyles(label.title, formData.labels, theme)}
                                                >
                                                    {label.title}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Button variant="contained" onClick={() => { setAddLabelModal(true) }}>Add</Button>
                                </div>
                            </div>
                        </div>
                        <TextField autoComplete="off" className="txt-input amount-input" type="number" error={errors.amount} value={formData.amount} name="amount" label="Amount" variant="outlined" />
                    </Box>
                    <Stack className="form-buttons" spacing={2} direction="row">
                        <Button variant="contained" onClick={onSubmit}>{selectedAction ? 'Submit' : 'Add new action'}</Button>
                    </Stack>
                </div>
            </div>

            <ReactDimmer isOpen={addCategoryModal} exitDimmer={setAddCategoryModal} zIndex={105} blur={1.5} saturate={85} />
            <ReactDimmer isOpen={addLabelModal} exitDimmer={setAddLabelModal} zIndex={105} blur={1.5} saturate={85} />
            {addCategoryModal && <CategoryModal closeModal={setAddCategoryModal} setFormData={setFormData} />}
            {addLabelModal && <LabelModal closeModal={setAddLabelModal} setFormData={setFormData} />}
        </>
    )
}
