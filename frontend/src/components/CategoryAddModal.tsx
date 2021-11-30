import { Button, Stack, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { GetIcon } from './GetIcon'
import { BsApp } from 'react-icons/bs'
import { Screen } from './Screen'
import { useDispatch } from 'react-redux'
import { addCategory } from '../store/actions/user.action'
import { IAction } from '../interfaces/dataInterfaces'

interface IModalProps {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
    setFormData: React.Dispatch<React.SetStateAction<IAction>>;
}

const colors = [
    '#C8331B',
    '#c35353',
    '#DB7476',
    '#ef6f71',
    '#D99CA5',
    '#E56D31',
    '#f37a11',
    '#fba66c',
    '#EDCB9C',
    '#FFE7C9',
    '#F4CF47',
    '#fdd149',
    '#dfda68',
    '#FFFAC9',
    '#51A885',
    '#68A828',
    '#62c799',
    '#87e38d',
    '#b0f52d',
    '#b1e27d',
    '#C2E0AE',
    '#97c598',
    '#C9EFCB',
    '#21ADD7',
    '#267A9E',
    '#4374b4',
    '#4274fd',
    '#6ac1d4',
    '#986B9B',
    '#9174a9',
    '#9e8af8',
    '#b4ced8',

]

// Todo: Load icons from backend
const icons = [
    'shopping-cart',
    'car',
    'food',
    'motorcycle',
    'beer',
    'home',
    'money'
]

const btnErrorStyle = {
    border: '2px #E34C4C solid'
}

export const CategoryAddModal = ({ closeModal, setFormData }: IModalProps) => {

    const dispatch = useDispatch()

    const [categoryName, setCategoryName] = useState('')
    const [selectedIcon, setSelectedIcon] = useState('')
    const [selectedColor, setSelectedColor] = useState('gray')

    const [isColorsModalOpen, setColorsModal] = useState(false)
    const [isIconsModalOpen, setIconsModal] = useState(false)

    const [errors, setErrors] = useState({
        categoryName: false,
        selectedIcon:false
    })

    const categoryNameChange = (ev: React.ChangeEvent<HTMLFormElement>) => {
        setCategoryName(ev.target.value)
    }

    const selectColorHandle = (color: string) => {
        setSelectedColor(color)
        setColorsModal(false)
    }

    const selectIconHandle = (icon: string) => {
        setSelectedIcon(icon)
        setIconsModal(false)
    }

    const onSubmit = () => {
        const errorsCopy = {...errors}

        errorsCopy.categoryName = categoryName ? false : true
        errorsCopy.selectedIcon = selectedIcon ? false : true


        if(errorsCopy.categoryName || errorsCopy.selectedIcon){
            setErrors(errorsCopy)
            return
        } else {
            const categoryFormatedName = categoryName[0].toUpperCase() + categoryName.substr(1)
            
            const newCategory = {
                title: categoryFormatedName,
                icon: selectedIcon,
                bgColor: selectedColor
            }

            dispatch(addCategory(newCategory))
            setFormData(formData => {return {...formData, category: categoryFormatedName}})
            closeModal(false)
        }
    }

    return (
        <>
            <div className="category-add-modal modal">
                <div className="modal-header">
                    <h3>Add new category</h3>
                    <AiOutlineClose className="exit-modal-btn" onClick={() => { closeModal(false) }} />
                </div>
                <div className="modal-body">
                    <Box className="modal-form" component="form" noValidate autoComplete="off" onChange={categoryNameChange}>
                        <TextField className="txt-input" error={errors.categoryName} value={categoryName} name="category" label="category name" variant="outlined" />
                    </Box>
                    <Button variant="contained" style={errors.selectedIcon ? btnErrorStyle : {}} onClick={() => { setIconsModal(true) }}>Pick icon</Button>
                    <Button variant="contained" onClick={() => { setColorsModal(true) }}>Pick color</Button>
                    <div className="icon-preview" style={{ backgroundColor: selectedColor }}>
                        {!selectedIcon && <BsApp />}
                        {selectedIcon && <GetIcon iconName={selectedIcon} />}
                    </div>
                    <Stack className="form-buttons" spacing={2} direction="row">
                        <Button variant="contained" onClick={onSubmit}>Add</Button>
                    </Stack>
                </div>
            </div>
            <Screen isOpen={isColorsModalOpen} exitScreen={setColorsModal} zIndex="120" />
            <Screen isOpen={isIconsModalOpen} exitScreen={setIconsModal} zIndex="120" />

            {isColorsModalOpen && <div className="colors-pick-modal pick-modal">
                {colors.map(color => <div key={color} onClick={() => { selectColorHandle(color) }} className="color" style={{ backgroundColor: color }}></div>)}
            </div>}

            {isIconsModalOpen && <div className="icon-pick-modal pick-modal">
                {icons.map(icon => <div key={`cat-pick-${icon}`} onClick={() => { selectIconHandle(icon) }}><GetIcon iconName={icon} /></div>)}
            </div>}
        </>
    )
}
