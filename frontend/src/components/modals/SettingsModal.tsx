import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

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
                    {tabs.map(tab => <h2 key={tab} onClick={() => {setCurrentTab(tab)}} style={currentTab === tab ? { color: 'black', fontWeight: '600', borderBottom: '3px black solid' } : {}}>{tab}</h2>)}
                </div>
                <div className="settings-body">
                    {currentTab === 'Account' && <AccountSettings/>}
                    {currentTab === 'Preferences' && <PreferencesSettings/>}
                    {currentTab === 'Categories' && <CategoriesSettings/>}
                    {currentTab === 'Labels' && <LabelsSettings/>}
                </div>
            </div>
        </div>
    )
}

const AccountSettings = () => {
    return <h2>Account</h2>
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

