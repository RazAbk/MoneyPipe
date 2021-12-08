import { Button, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FiUpload } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { sessionStorageService } from '../../services/session-storage.service'
import { RootState } from '../../store/store'
// import { IUser } from '../../interfaces/userInterfaces'

interface IModalProps {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const tabs = ['Account', 'Preferences', 'Categories', 'Labels']

export const SettingsModal = ({ closeModal }: IModalProps) => {



    const [currentTab, setCurrentTab] = useState('Account')

    return (
        <div className="settings-modal modal">
            <div className="modal-header">
                <h3>Settings</h3>
                <AiOutlineClose className="exit-modal-btn" onClick={() => { closeModal(false) }} />
            </div>
            <div className="modal-body">
                <div className="tabs">
                    {tabs.map(tab => <h2 key={tab} onClick={() => { setCurrentTab(tab) }} style={currentTab === tab ? { color: 'black', fontWeight: '600', borderBottom: '3px black solid' } : {}}>{tab}</h2>)}
                </div>
                <div className="settings-body">
                    {currentTab === 'Account' && <AccountSettings />}
                    {currentTab === 'Preferences' && <PreferencesSettings />}
                    {currentTab === 'Categories' && <CategoriesSettings />}
                    {currentTab === 'Labels' && <LabelsSettings />}
                </div>
            </div>
        </div>
    )
}

const AccountSettings = () => {

    const user = useSelector((state: RootState) => state.userModule.loggedInUser) || sessionStorageService.load('loggedInUser')

    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        password1: '',
        password2: '',
        picture: ''
    })

    const pictureRef = useRef(null)

    const handleChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, [ev.target.name]: ev.target.value })
    }

    const handleUploadClick = () => {
        if(pictureRef.current){
            const element: HTMLInputElement = pictureRef.current
            element.click()
        }
    }

    const handleSubmit = () => {

    }

    return (
        <div className="account-settings">
            <div className="inputs">
                <TextField value={formData.firstName} name="firstName" onChange={handleChange} label="first name" variant="outlined" />
                <TextField value={formData.lastName} name="lastName" onChange={handleChange} label="last name" variant="outlined" />
                <TextField type="password" value={formData.password1} name="password1" onChange={handleChange} label="new password" variant="outlined" />
                <TextField type="password" value={formData.password2} name="password2" onChange={handleChange} label="verify password" variant="outlined" />
                <Button onClick={handleUploadClick}>upload new picture<FiUpload/></Button>
                <input ref={pictureRef} type="file" style={{display: 'none'}} />
            </div>
            <Button onClick={handleSubmit}>submit</Button>
        </div>
    )
}

const PreferencesSettings = () => {
    return <h2>Preferences</h2>
}

const CategoriesSettings = () => {
    return <h2>Categories</h2>
}

const LabelsSettings = () => {
    return <h2>Labels</h2>
}

