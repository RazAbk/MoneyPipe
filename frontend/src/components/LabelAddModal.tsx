import { Button, Stack } from '@mui/material'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

interface IModalProps {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LabelAddModal = ({ closeModal }: IModalProps) => {
    return (
        <>
            <div className="label-add-modal modal">
                <div className="modal-header">
                    <h3>Add new label</h3>
                    <AiOutlineClose className="exit-modal-btn" onClick={() => { closeModal(false) }} />
                </div>
                <div className="modal-body">

                </div>
                <div className="modal-footer">
                    <Stack className="form-buttons" spacing={2} direction="row">
                        <Button variant="contained" onClick={() => { }}>Add</Button>
                    </Stack>
                </div>
            </div>
            {/* <Screen isOpen={addLabelModal} exitScreen={setAddLabelModal} zIndex="120" /> */}
        </>
    )
}
