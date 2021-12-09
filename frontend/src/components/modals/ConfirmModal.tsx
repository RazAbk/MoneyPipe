import { Button } from '@mui/material'
import React, { ReactElement } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

interface IModalProps {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    message: ReactElement<HTMLDivElement>;
    setAnswer: (answer: boolean) => void;
}

export const ConfirmModal = ({ closeModal, title, message, setAnswer }: IModalProps) => {

    return (
        <div className="confirm-modal modal">
            <div className="modal-header">
                <h3>{title}</h3>
                <AiOutlineClose className="exit-modal-btn" onClick={() => { closeModal(false); setAnswer(false)}} />
            </div>
            <div className="modal-body">
                {message}
                <div className="buttons">
                    <Button onClick={() => {closeModal(false); setAnswer(true)}}>confirm</Button>
                    <Button onClick={() => {closeModal(false); setAnswer(false)}}>cancel</Button>
                </div>
            </div>
        </div>
    )
}
