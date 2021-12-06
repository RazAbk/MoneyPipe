import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import graphSvg from '../assets/images/graphssvg.svg'

interface IErrors {
    [key: string]: boolean
}

export const HomePage = () => {

    const [formState, setFormState] = useState('login')
    const [formData, setFormData] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        password: ''
    })

    const [errors, setErrors] = useState<IErrors>({
        userName: false,
        firstName: false,
        lastName: false,
        password: false
    })


    const handleChange = (ev: React.ChangeEvent<HTMLFormElement>) => {
        setFormData(prevState => { return { ...prevState, [ev.target.name]: ev.target.value } })
    }

    const handleSignup = () => {
        const errorsCopy = { ...errors }

        // Todo: Improve userName and password validation
        errorsCopy.userName = !formData.userName ? true : false
        errorsCopy.password = !formData.password ? true : false
        errorsCopy.firstName = !formData.firstName ? true : false
        errorsCopy.lastName = !formData.lastName ? true : false

        let isValid = true

        for (const key in errorsCopy) {
            if (errorsCopy[key]) {
                isValid = false
                break
            }
        }

        if (isValid) {
            console.log(formData)
        } else {
            setErrors(errorsCopy)
        }
    }

    const handleLogin = () => {
        const userName = formData.userName
        const password = formData.password

        const errorsCopy = {...errors}

        let isValid = true

        if(!userName){
            isValid = false
            errorsCopy.userName = true
        }
        if(!password){
            isValid = false
            errorsCopy.password = true
        }


        if(isValid){
            // Todo: preform a login
            console.log('login!')
            console.log('userName', userName)
            console.log('password', password)
        } else {
            setErrors(errorsCopy)
        }
    }

    const switchFormState = () => {
        if (formState === 'signup') setFormState('login')
        else setFormState('signup')
    }

    return (
        <>
            <div className="homepage">
                <div className="left-side">
                    <h2>MoneyPipe</h2>
                    <img src={graphSvg} alt="graph" />
                </div>
                <div className="right-side">
                    <h4 className="form-state-header">{formState === 'signup' ? 'Have an account? ' : `Don't have an account? `}<span onClick={switchFormState}>{formState === 'signup' ? 'Login' : 'Signup'}</span></h4>
                    <h2>{formState === 'signup' ? 'Create account' : 'Login'}</h2>
                    <Box onChange={handleChange} component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} autoComplete="off">
                        <TextField label="username" error={errors.userName} name="userName" value={formData.userName} helperText={errors.userName ? 'invalid user name' : ''} />
                        {formState === 'signup' && <div className="name-fields">
                            <TextField label="first name" error={errors.firstName} name="firstName" value={formData.firstName} />
                            <TextField label="last name" error={errors.lastName} name="lastName" value={formData.lastName} />
                        </div>
                        }
                        <TextField type="password" label="password" error={errors.password} name="password" value={formData.password} helperText={errors.password ? 'invalid password' : ''} />
                        <Button onClick={formState === 'signup' ? handleSignup : handleLogin}>{formState === 'signup' ? 'Sign up' : 'Login'}</Button>
                    </Box>
                    <hr></hr>
                    <Button>Google btn</Button>
                </div>
            </div>
            <div className="dimmer-screen"></div>
        </>
    )
}
