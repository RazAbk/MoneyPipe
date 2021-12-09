import { Button, Stack, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { IAction, ILabel } from '../../interfaces/dataInterfaces'
import { addLabel } from '../../store/actions/user.action'

interface IModalProps {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
    setFormData?: React.Dispatch<React.SetStateAction<IAction>>;
    labelToEdit?: ILabel;
}

export const LabelAddModal = ({ closeModal, setFormData, labelToEdit }: IModalProps) => {

    const dispatch = useDispatch()

    const [label, setLabel] = useState(labelToEdit?.title || '')
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
                _id: labelToEdit?._id || '',
                title: label,
                labelName: formatedLabel
            }

            dispatch(addLabel(newLabel))
            if(!labelToEdit && setFormData){
                setFormData(formData => { return { ...formData, labels: [...formData.labels, formatedLabel] } })
            }
            closeModal(false)
        }
    }

    return (
        <div className="label-add-modal modal">
            <div className="modal-header">
                <h3>{labelToEdit ? 'Edit label' : 'Add new label'}</h3>
                <AiOutlineClose className="exit-modal-btn" onClick={() => { closeModal(false) }} />
            </div>
            <div className="modal-body">
                <Box className="modal-form" component="form" noValidate autoComplete="off" onChange={handleLabelChange}>
                    <TextField className="txt-input" error={error} value={label} name="label" label="label name" variant="outlined" />
                </Box>
                <Stack className="form-buttons" spacing={2} direction="row">
                    <Button variant="contained" onClick={onSubmitLabel}>{labelToEdit ? 'Submit' : 'Add'}</Button>
                </Stack>
            </div>
        </div>
    )
}
