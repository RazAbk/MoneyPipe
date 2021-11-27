import { Theme, useTheme } from '@mui/material/styles';
import { Button, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { IAction, IDataObject } from '../interfaces/dataInterfaces'
import { RootState } from '../store/store'

interface IActionAddModalProps {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
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

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export const ActionAddModal = ({ closeModal }: IActionAddModalProps) => {

    const rawData: IDataObject = useSelector((state: RootState) => state.userModule.data)

    const theme = useTheme();

    const [formData, setFormData] = useState<IAction>({
        type: 'expense',
        labels: [],
        category: '',
        description: '',
        amount: 0,
        createdAt: Date.now()
    })

    const handleChange = () => {
        
    }

    const handleLabelsChange = (ev: any) => {
        const labels = ev.target.value
        const formDataCopy = { ...formData, labels: typeof labels === 'string' ? labels.split(',') : labels }
        setFormData(formDataCopy)
    }

    return (
        <div className="modal action-add-modal">
            <div className="modal-header">
                <h3>Add new action</h3>
                <AiOutlineClose className="exit-modal-btn" onClick={() => { closeModal(false) }} />
            </div>
            <div className="modal-body">
                <Box className="modal-form" component="form" noValidate autoComplete="off" onChange={handleChange}>
                    <TextField className="txt-input" value={formData.description} name="description" label="Description" variant="outlined" />
                    <div className="input-selectors">
                        <div className="input-select">
                            <FormControl className="input-field" fullWidth>
                                <InputLabel id="category">Category</InputLabel>
                                <Select fullWidth labelId="category" id="category" value={null} label="Category" name="category" onChange={handleChange}>
                                    {rawData && rawData.categories.map(category => <MenuItem key={`cat-filter-${category.title}`} value={category.title}>{category.title}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="input-select">
                            <FormControl className="input-field" fullWidth>
                                <InputLabel id="label">Labels</InputLabel>
                                <Select id="multiple-labels" multiple value={formData.labels} onChange={handleLabelsChange} 
                                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                        renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {rawData.labels.map((label) => (
                                        <MenuItem
                                            key={'options-' + label.labelName}
                                            value={label.labelName}
                                            style={getStyles(label.title, formData.labels, theme)}
                                        >
                                            {label.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <TextField className="txt-input amount-input" value={formData.description} name="amount" label="Amount" variant="outlined" />
                </Box>
            </div>
            <div className="modal-footer">
                <Stack className="form-buttons" spacing={2} direction="row">
                    <Button variant="contained" onClick={() => { console.log('labels', formData.labels) }}>Add</Button>
                </Stack>
            </div>
        </div>
    )
}
