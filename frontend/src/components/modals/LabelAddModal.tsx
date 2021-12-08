import { Button, Stack, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { IAction } from '../../interfaces/dataInterfaces'
import { addLabel } from '../../store/actions/user.action'

interface IModalProps {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
    setFormData: React.Dispatch<React.SetStateAction<IAction>>;
}

export const LabelAddModal = ({ closeModal, setFormData }: IModalProps) => {

    const dispatch = useDispatch()

    const [label, setLabel] = useState('')
    const [error, setError] = useState(false)

    const handleLabelChange = (ev: React.ChangeEvent<HTMLFormElement>) => {
        setLabel(ev.target.value)
    }

    const onSubmitLabel = () => {
        if (!label) {
            setError(true)
            return
        } else {
            const formatedLabel = '#' + label.toLowerCase().split('').filter(char => char !== ' ').join('')

            const newLabel = {
                title: label,
                labelName: formatedLabel
            }

            dispatch(addLabel(newLabel))
            setFormData(formData => { return { ...formData, labels: [...formData.labels, formatedLabel] } })
            closeModal(false)
        }
    }

    return (
        <div className="label-add-modal modal">
            <div className="modal-header">
                <h3>Add new label</h3>
                <AiOutlineClose className="exit-modal-btn" onClick={() => { closeModal(false) }} />
            </div>
            <div className="modal-body">
                <Box className="modal-form" component="form" noValidate autoComplete="off" onChange={handleLabelChange}>
                    <TextField className="txt-input" error={error} value={label} name="label" label="label name" variant="outlined" />
                </Box>
                <Stack className="form-buttons" spacing={2} direction="row">
                    <Button variant="contained" onClick={onSubmitLabel}>Add</Button>
                </Stack>
            </div>
        </div>
    )
}
