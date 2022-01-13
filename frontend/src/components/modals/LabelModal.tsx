import { Button, Stack, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { IAction, IFilterBy, ILabel } from '../../interfaces/dataInterfaces'
import { setLoader } from '../../store/actions/app-state.action'
import { addLabel } from '../../store/actions/user.action'
import { RootState } from '../../store/store'

interface IModalProps {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
    setFormData?: React.Dispatch<React.SetStateAction<IAction>>;
    labelToEdit?: ILabel | null;
}

export const LabelModal = ({ closeModal, setFormData, labelToEdit }: IModalProps) => {

    const dispatch = useDispatch()
    const filterBy: IFilterBy = useSelector((state: RootState) => state.appStateModule.filterBy)
    const [label, setLabel] = useState(labelToEdit?.title || '')
    const [error, setError] = useState(false)

    const handleLabelChange = (ev: React.ChangeEvent<HTMLFormElement>) => {
        setLabel(ev.target.value)
    }

    const onSubmitLabel = async () => {
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
            dispatch(setLoader(true))
            const res = await dispatch(addLabel(newLabel, filterBy))
            dispatch(setLoader(false))
            if(!labelToEdit && setFormData && res){
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
                    <TextField autoComplete="off" className="txt-input" error={error} value={label} name="label" label="label name" variant="outlined" />
                </Box>
                <Stack className="form-buttons" spacing={2} direction="row">
                    <Button variant="contained" onClick={onSubmitLabel}>{labelToEdit ? 'Submit' : 'Add'}</Button>
                </Stack>
            </div>
        </div>
    )
}
