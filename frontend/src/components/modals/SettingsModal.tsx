import { Button, FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FiUpload } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { IDataObject } from '../../interfaces/dataInterfaces'
import { IUpdateForm } from '../../interfaces/userInterfaces'
import { sessionStorageService } from '../../services/session-storage.service'
import { userService } from '../../services/user.service'
import { utilService } from '../../services/util.service'
import { setUser } from '../../store/actions/user.action'
import { RootState } from '../../store/store'

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
                    {currentTab === 'Account' && <AccountSettings closeModal={closeModal} />}
                    {currentTab === 'Preferences' && <PreferencesSettings />}
                    {currentTab === 'Categories' && <CategoriesSettings />}
                    {currentTab === 'Labels' && <LabelsSettings />}
                </div>
            </div>
        </div>
    )
}

const AccountSettings = ({ closeModal }: IModalProps) => {

    interface IForm {
        firstName: string,
        lastName: string,
        password1: string,
        password2: string,
        picture: string | null
    }

    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.userModule.loggedInUser) || sessionStorageService.load('loggedInUser')

    const [formData, setFormData] = useState<IForm>({
        firstName: user.firstName,
        lastName: user.lastName,
        password1: '',
        password2: '',
        picture: null
    })

    const [errors, setErrors] = useState({
        password: false
    })

    const pictureRef = useRef(null)

    const handleChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, [ev.target.name]: ev.target.value })
    }

    const handleUploadClick = () => {
        if (pictureRef.current) {
            const element: HTMLInputElement = pictureRef.current
            element.click()
        }
    }

    const handlePictureUpload = async (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (ev.target.files && ev.target.files.length > 0) {
            // Todo: Insert some loader in here
            const url = await userService.uploadImg(ev.target.files[0])
            // Todo: remove the loader here
            setFormData({ ...formData, picture: url })
        }
    }

    const handleSubmit = async () => {
        const formToSubmit: IUpdateForm = {}

        if (formData.password1 || formData.password2) {
            if (formData.password1 !== formData.password2) {
                setErrors({ ...errors, password: true })
                return
            } else {
                formToSubmit.password = formData.password1
            }
        }

        if (formData.firstName && formData.firstName !== user.firstName) {
            formToSubmit.firstName = formData.firstName
        }

        if (formData.lastName && formData.lastName !== user.lastName) {
            formToSubmit.lastName = formData.lastName
        }

        if (formData.picture) {
            formToSubmit.picture = formData.picture
        }


        const updatedUser = await userService.updateUser(formToSubmit)
        dispatch(setUser(updatedUser))
        closeModal(false)
    }

    return (
        <div className="account-settings">
            <div className="inputs">
                <TextField value={formData.firstName} name="firstName" onChange={handleChange} label="first name" variant="outlined" />
                <TextField value={formData.lastName} name="lastName" onChange={handleChange} label="last name" variant="outlined" />
                <TextField type="password" error={errors.password} value={formData.password1} name="password1" onChange={handleChange} label="new password" variant="outlined" />
                <TextField type="password" error={errors.password} value={formData.password2} name="password2" onChange={handleChange} label="verify password" variant="outlined" />
                <Button onClick={handleUploadClick}>upload new picture<FiUpload /></Button>
                <input ref={pictureRef} type="file" onChange={handlePictureUpload} style={{ display: 'none' }} />
                <p>*change only what's needed</p>
            </div>
            <Button onClick={handleSubmit}>submit</Button>
        </div>
    )
}

const PreferencesSettings = () => {

    interface ICurrencyData {
        currencyName: string,
        currencySymbol?: string,
        id: string
    }

    const rawData: IDataObject = useSelector((state: RootState) => state.userModule.data)

    const [formData, setFormData] = useState({
        currencySign: rawData.currencySign
    })
    const [currencies, setCurrencies] = useState<ICurrencyData[] | null>(null)

    useEffect(() => {
        (async () => {
            const data = await utilService.getCurrencies()
            const currencies = Object.entries(data).filter((currency: any) => {return currency[1].currencySymbol ? true : false}).map((currency: any) => currency[1])
            setCurrencies(currencies)
        })()
    }, [])

    const handleChange = (ev: SelectChangeEvent<string>) => {
        setFormData({...formData, [ev.target.name]: ev.target.value})
    }

    const handleSubmit = () => {
        console.log('formData', formData)
    }


    return (
        <div className="preferences-settings">
            <div className="inputs">
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <FormHelperText>Currency sign</FormHelperText>
                        <Select value={formData.currencySign} name="currencySign" onChange={handleChange}>
                            {currencies && currencies.map((currency: ICurrencyData) => <MenuItem key={currency.id} value={currency.currencySymbol}>{currency.currencyName} {currency.currencySymbol}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <Button onClick={handleSubmit}>submit</Button>
        </div>
    )
}

const CategoriesSettings = () => {
    return <h2>Categories</h2>
}

const LabelsSettings = () => {
    return <h2>Labels</h2>
}

