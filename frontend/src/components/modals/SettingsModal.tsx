import { Button, FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FaRegEdit } from 'react-icons/fa'
import { FiUpload } from 'react-icons/fi'
import { VscTrash } from 'react-icons/vsc'
import { useDispatch, useSelector } from 'react-redux'
import { ICategory, IDataObject, ILabel } from '../../interfaces/dataInterfaces'
import { IUpdateForm } from '../../interfaces/userInterfaces'
import { sessionStorageService } from '../../services/session-storage.service'
import { userService } from '../../services/user.service'
import { utilService } from '../../services/util.service'
import { setData, setUser } from '../../store/actions/user.action'
import { RootState } from '../../store/store'
import { GetIcon } from '../GetIcon'
import { Screen } from '../Screen'
import { CategoryAddModal } from './CategoryAddModal'
import { LabelAddModal } from './LabelAddModal'

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
                    {currentTab === 'Preferences' && <PreferencesSettings closeModal={closeModal} />}
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

const PreferencesSettings = ({ closeModal }: IModalProps) => {

    interface ICurrencyObj {
        id: string,
        currencySymbol?: string,
        currencyName: string
    }

    const dispatch = useDispatch()
    const rawData: IDataObject = useSelector((state: RootState) => state.userModule.data)

    const [formData, setFormData] = useState({
        currency: rawData.currency
    })
    const [currencies, setCurrencies] = useState<ICurrencyObj[] | null>(null)

    useEffect(() => {
        (async () => {
            const data = await utilService.getCurrencies()
            const currencies = Object.entries(data).filter((currency: any) => { return currency[1].currencySymbol ? true : false }).map((currency: any) => currency[1])
            setCurrencies(currencies)
        })()
    }, [])

    const handleChange = (ev: SelectChangeEvent<string>) => {
        if (ev.target.name === 'currency') {
            const currency = {
                code: ev.target.value,
                sign: utilService.getSymbolFromCode(ev.target.value)
            }
            setFormData({ ...formData, [ev.target.name]: currency })
        } else {
            // If other fields come in the future...
        }
    }

    const handleSubmit = async () => {
        const updatedData = await userService.updateData(formData)
        dispatch(setData(updatedData))
        closeModal(false)
    }


    return (
        <div className="preferences-settings">
            <div className="inputs">
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <FormHelperText>Currency sign</FormHelperText>
                        <Select value={formData.currency.code} name="currency" onChange={handleChange}>
                            {currencies && currencies.map((currency: ICurrencyObj) => <MenuItem key={currency.id} value={currency.id}>{currency.currencyName} {currency.currencySymbol}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <Button onClick={handleSubmit}>submit</Button>
        </div>
    )
}

const CategoriesSettings = () => {

    const rawData: IDataObject = useSelector((state: RootState) => state.userModule.data)

    const [addCategoryModal, setAddCategoryModal] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null)

    return (
        <>
            <div className="categories-settings">
                <div className="select-modal">
                    {rawData && rawData.categories.map((category: ICategory) => {
                        return (
                            <div key={category._id} className="category-preview">
                                <div className="left-side">
                                    <div className="icon" style={{ backgroundColor: category.bgColor }}>
                                        <GetIcon iconName={category.icon} />
                                    </div>
                                    {category.title}
                                </div>
                                <div className="right-side">
                                    <div onClick={() => { setSelectedCategory(category); setAddCategoryModal(true) }}><FaRegEdit /></div>
                                    <div className="delete-btn"><VscTrash /></div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <Button>add new</Button>
            </div>

            {selectedCategory &&
                <>
                    <Screen isOpen={addCategoryModal} exitScreen={setAddCategoryModal} zIndex="100" />
                    {addCategoryModal && <CategoryAddModal closeModal={setAddCategoryModal} categoryToEdit={selectedCategory} />}
                </>
            }
        </>
    )
}

const LabelsSettings = () => {

    const rawData: IDataObject = useSelector((state: RootState) => state.userModule.data)

    const [addLabelModal, setAddLabelModal] = useState(false)
    const [selectedLabel, setSelectedLabel] = useState<ILabel | null>(null)

    return (
        <>
            <div className="labels-settings">
                <div className="select-modal">
                    {rawData && rawData.labels.map((label: ILabel) => {
                        return (
                            <div key={label._id} className="label-preview">
                                <div className="left-side">
                                    <h2 className="label">{label.labelName}</h2>
                                </div>
                                <div className="right-side">
                                    <div onClick={() => { setSelectedLabel(label); setAddLabelModal(true) }}><FaRegEdit /></div>
                                    <div className="delete-btn"><VscTrash /></div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <Button>add new</Button>
            </div>
            {selectedLabel &&
                <>
                    <Screen isOpen={addLabelModal} exitScreen={setAddLabelModal} zIndex="100" />
                    {addLabelModal && <LabelAddModal closeModal={setAddLabelModal} labelToEdit={selectedLabel} />}
                </>
            }
        </>
    )
}

