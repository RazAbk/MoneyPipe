import { Button, FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import { ReactDimmer } from 'react-dimmer'
import { AiOutlineClose } from 'react-icons/ai'
import { FaRegEdit } from 'react-icons/fa'
import { FiUpload } from 'react-icons/fi'
import { VscTrash } from 'react-icons/vsc'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ICategory, IDataObject, IDataUpdateForm, IFilterBy, ILabel } from '../../interfaces/dataInterfaces'
import { IUpdateForm } from '../../interfaces/userInterfaces'
import { alertMessage, alertTitleMessage } from '../../services/alert.service'
import { sessionStorageService } from '../../services/session-storage.service'
import { userService } from '../../services/user.service'
import { utilService } from '../../services/util.service'
import { setLoader } from '../../store/actions/app-state.action'
import { deleteCategory, deleteLabel, deleteUser, updateData, updateUser } from '../../store/actions/user.action'
import { RootState } from '../../store/store'
import { GetIcon } from '../GetIcon'
import { Loader } from '../Loader'
import { CategoryModal } from './CategoryModal'
import { ConfirmModal } from './ConfirmModal'
import { LabelModal } from './LabelModal'

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
    const navigate = useNavigate()
    const user = useSelector((state: RootState) => state.userModule.loggedInUser) || sessionStorageService.load('loggedInUser')

    const [formData, setFormData] = useState<IForm>({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        password1: '',
        password2: '',
        picture: null
    })

    const [confirmModal, setConfirmModal] = useState(false)

    const [errors, setErrors] = useState({
        password: false
    })

    const pictureRef = useRef(null)

    const handleChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, [ev.target.name]: ev.target.value })
    }

    const handleUploadClick = () => {
        if (user.userName === 'DemoUser') {
            alertTitleMessage('Opps...', 'Changes cannot be made on demo user', 'warning', 3500)
            return
        }
        if (pictureRef.current) {
            const element: HTMLInputElement = pictureRef.current
            element.click()
        }
    }

    const handlePictureUpload = async (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (ev.target.files && ev.target.files.length > 0) {
            dispatch(setLoader(true))
            alertMessage('Uploading image to cloud...', 'info', 3500)
            const url = await userService.uploadImg(ev.target.files[0])
            if (url) {
                setFormData({ ...formData, picture: url })
                alertMessage('Image uploaded to cloud...', 'success', 3500)
            } else {
                alertMessage('Something went wrong, try again later...', 'warning', 3500)
            }
            dispatch(setLoader(false))
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

        dispatch(setLoader(true))
        await dispatch(updateUser(formToSubmit))
        dispatch(setLoader(false))
        closeModal(false)
    }

    const handleConfirmModal = async () => {
        setConfirmModal(true)
    }

    const modalMessage = (
        <div>
            <h3>This is irreversible.</h3>
            <h3>Deleting your account will delete all of it's data forever.</h3>
        </div>
    )

    const handleModalAnswer = async (answer: boolean) => {
        if (answer) {
            dispatch(setLoader(true))
            const res = await dispatch(deleteUser())
            dispatch(setLoader(false))
            if (!res) {
                console.log('could not delete user')
            } else {
                navigate('/')
            }
        }
    }

    if (!user) return <Loader />

    return (
        <>
            <div className="account-settings">
                <div className="inputs">
                    <TextField autoComplete="off" value={formData.firstName} name="firstName" onChange={handleChange} label="first name" variant="outlined" />
                    <TextField autoComplete="off" value={formData.lastName} name="lastName" onChange={handleChange} label="last name" variant="outlined" />
                    {!user.isGoogle &&
                        <>
                            <TextField autoComplete="off" value={formData.password1} name="password1" onChange={handleChange} label="new password" type="password" error={errors.password} variant="outlined" />
                            <TextField autoComplete="off" value={formData.password2} name="password2" onChange={handleChange} label="verify password" type="password" error={errors.password} variant="outlined" />
                        </>
                    }
                    <Button onClick={handleUploadClick}>upload new picture<FiUpload /></Button>
                    <input ref={pictureRef} type="file" onChange={handlePictureUpload} style={{ display: 'none' }} />
                    <p>*change only what's needed</p>
                </div>
                <Button onClick={handleSubmit}>submit</Button>
                <Button className="delete-account-btn" onClick={handleConfirmModal}>delete account</Button>
            </div>
            <ReactDimmer isOpen={confirmModal} exitDimmer={setConfirmModal} zIndex={120} blur={1.5} saturate={85} />
            {confirmModal && <ConfirmModal title="Warning" message={modalMessage} setAnswer={handleModalAnswer} closeModal={setConfirmModal} />}
        </>
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
    const filterBy: IFilterBy = useSelector((state: RootState) => state.appStateModule.filterBy)

    const [formData, setFormData] = useState<IDataUpdateForm>({
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
        dispatch(setLoader(true))
        await dispatch(updateData(formData, filterBy))
        dispatch(setLoader(false))
        closeModal(false)
    }


    return (
        <div className="preferences-settings">
            <div className="inputs">
                {formData.currency &&
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <FormHelperText>Currency sign</FormHelperText>
                            <Select value={formData.currency.code} name="currency" onChange={handleChange}>
                                {currencies && currencies.map((currency: ICurrencyObj) => <MenuItem key={currency.id} value={currency.id}>{currency.currencyName} {currency.currencySymbol}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Box>
                }
            </div>
            <Button onClick={handleSubmit}>submit</Button>
        </div>
    )
}

const CategoriesSettings = () => {

    const dispatch = useDispatch()
    const rawData: IDataObject = useSelector((state: RootState) => state.userModule.data)
    const filterBy: IFilterBy = useSelector((state: RootState) => state.appStateModule.filterBy)

    const [addCategoryModal, setAddCategoryModal] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null)

    useEffect(() => {
        if (!addCategoryModal) {
            setSelectedCategory(null)
        }
    }, [addCategoryModal])

    const handleDelete = async (categoryId: string) => {
        dispatch(setLoader(true))
        const res = await dispatch(deleteCategory(categoryId, filterBy))
        dispatch(setLoader(false))
        if (!res) {
            alertMessage("Cannot delete a category while it's in use", 'danger', 3500)
        }
    }

    return (
        <>
            <div className="categories-settings">
                <div className="select-modal">
                    {rawData.categories.length === 0 && <h2 className="empty-msg">No categories to show</h2>}
                    {rawData && rawData.categories.map((category: ICategory) => {
                        return (
                            <div key={category._id} className="category-preview">
                                <div className="left-side">
                                    <div className="icon" style={{ backgroundColor: category.bgColor }}>
                                        <GetIcon iconName={category.icon} />
                                    </div>
                                    <p>{category.title}</p>
                                </div>
                                <div className="right-side">
                                    <div onClick={() => { setSelectedCategory(category); setAddCategoryModal(true) }}><FaRegEdit /></div>
                                    <div className="delete-btn" onClick={() => { handleDelete(category._id) }}><VscTrash /></div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <Button onClick={() => { setAddCategoryModal(true) }}>add new</Button>
            </div>

            {addCategoryModal &&
                <>
                    {addCategoryModal && <CategoryModal closeModal={setAddCategoryModal} categoryToEdit={selectedCategory} />}
                </>
            }
            <ReactDimmer isOpen={addCategoryModal} exitDimmer={setAddCategoryModal} zIndex={100} blur={1.5} saturate={85} />
        </>
    )
}

const LabelsSettings = () => {

    const dispatch = useDispatch()
    const rawData: IDataObject = useSelector((state: RootState) => state.userModule.data)
    const filterBy: IFilterBy = useSelector((state: RootState) => state.appStateModule.filterBy)

    const [addLabelModal, setAddLabelModal] = useState(false)
    const [selectedLabel, setSelectedLabel] = useState<ILabel | null>(null)

    const [confirmModal, setConfirmModal] = useState(false)

    const handleModalAnswer = async (answer: boolean) => {
        if (answer && selectedLabel) {
            dispatch(setLoader(true))
            await dispatch(deleteLabel(selectedLabel._id, filterBy))
            dispatch(setLoader(false))
        }
        setSelectedLabel(null)
    }

    const handleConfirmModal = async (label: ILabel) => {
        setSelectedLabel(label)
        setConfirmModal(true)
    }

    const modalMessage = (
        <div>
            <h3>This is irreversible.</h3>
            <h3>Deleting a label will remove it from all of it's occurrences forever.</h3>
        </div>
    )

    return (
        <>
            <div className="labels-settings">
                <div className="select-modal">
                    {rawData.labels.length === 0 && <h2 className="empty-msg">No labels to show</h2>}
                    {rawData && rawData.labels.map((label: ILabel) => {
                        return (
                            <div key={label._id} className="label-preview">
                                <div className="left-side">
                                    <h2 className="label">{label.labelName}</h2>
                                </div>
                                <div className="right-side">
                                    <div onClick={() => { setSelectedLabel(label); setAddLabelModal(true) }}><FaRegEdit /></div>
                                    <div className="delete-btn" onClick={() => { handleConfirmModal(label) }}><VscTrash /></div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <Button onClick={() => { setAddLabelModal(true) }}>add new</Button>
            </div>
            {addLabelModal &&
                <>
                    {addLabelModal && <LabelModal closeModal={setAddLabelModal} labelToEdit={selectedLabel} />}
                </>
            }
            <ReactDimmer isOpen={addLabelModal} exitDimmer={setAddLabelModal} zIndex={100} blur={1.5} saturate={85} />
            <ReactDimmer isOpen={confirmModal} exitDimmer={setConfirmModal} zIndex={120} blur={1.5} saturate={85} />
            {confirmModal && <ConfirmModal title="Warning" message={modalMessage} setAnswer={handleModalAnswer} closeModal={setConfirmModal} />}
        </>
    )
}

