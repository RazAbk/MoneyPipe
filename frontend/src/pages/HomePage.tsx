import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { signup, login, getUser } from '../store/actions/user.action'
import { setLoader } from '../store/actions/app-state.action'
import { RootState } from '../store/store'
import { GoogleLogin } from 'react-google-login';
import { alertMessage, alertTitleMessage } from '../services/alert.service'
import graphSvg from '../assets/images/graphssvg.svg'

interface IErrors {
    [key: string]: boolean
}

export const HomePage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loggedInUser = useSelector((state: RootState) => state.userModule.loggedInUser)

    const [formState, setFormState] = useState('login')
    const [formData, setFormData] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        password: '',
        isGoogle: false
    })

    const [errors, setErrors] = useState<IErrors>({
        userName: false,
        firstName: false,
        lastName: false,
        password: false
    })

    useEffect(() => {
        const _getUser = async () => {
            await dispatch(getUser())
        }
        _getUser()

    }, [dispatch])

    useEffect(() => {
        if (loggedInUser) {
            navigate('/mydata')
        }
    }, [loggedInUser, navigate])

    const handleChange = (ev: React.ChangeEvent<HTMLFormElement>) => {
        setFormData(prevState => { return { ...prevState, [ev.target.name]: ev.target.value } })
    }

    const handleSignup = async () => {
        const errorsCopy = { ...errors }

        const userNameTest = /^[A-Za-z][A-Za-z0-9!@#$%^&*_]{5,30}$/ // First char is a letter, rest can be numbers, letters or symbols, 5-30 length
        const passwordTests = [/^[A-Za-z0-9!@#$%^&*_].{8,}$/, /[A-Z]/, /[a-z]/, /[!@#$%^&*_]/] // At least on of each: uppercase letter, lowercase letter, digit, symbol, length of at least 8


        const isValidUserName = userNameTest.test(formData.userName)
        const isValidPassword = passwordTests.every(test => test.test(formData.password))

        if(!isValidPassword) alertTitleMessage('Invalid password', 'Must include at least 8 characters: upper and lower case, symbols and numbers', 'danger', 12000)
        if(!isValidUserName) alertTitleMessage('Invalid username', 'Must include at least 5 characters: letters, numbers and symbols', 'danger', 12000)

        errorsCopy.userName = !formData.userName ? true : false

        if (!formData.userName || !isValidUserName) {
            errorsCopy.userName = true
        } else {
            errorsCopy.userName = false
        }

        if (!formData.password || !isValidPassword) {
            errorsCopy.password = true
        } else {
            errorsCopy.password = false
        }

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
            (async () => {
                dispatch(setLoader(true))
                const user: any = await dispatch(signup(formData))
                dispatch(setLoader(false))
                if (user) {
                    navigate(`/mydata`)
                } else {
                    setErrors({ ...errors, userName: true, password: true })
                }
            })()

        } else {
            setErrors(errorsCopy)
        }
    }

    const handleLogin = () => {
        const userName = formData.userName
        const password = formData.password

        const errorsCopy = { ...errors }

        let isValid = true

        if (!userName) {
            isValid = false
            errorsCopy.userName = true
        }
        if (!password) {
            isValid = false
            errorsCopy.password = true
        }


        if (isValid) {
            (async () => {
                dispatch(setLoader(true))
                const user: any = await dispatch(login(formData))
                dispatch(setLoader(false))
                if (user) {
                    navigate(`/mydata`)
                } else {
                    setErrors(prevState => { return { ...prevState, userName: true, password: true } })
                }
            })()
        } else {
            setErrors(errorsCopy)
        }
    }

    const handleGoogleLogin = (responseGoogle: any) => {

        const credendials = {
            userName: responseGoogle.profileObj.email,
            firstName: responseGoogle.profileObj.givenName,
            lastName: responseGoogle.profileObj.familyName,
            password: responseGoogle.profileObj.googleId,
            picture: responseGoogle.profileObj.imageUrl,
            isGoogle: true
        };


        (async () => {
            dispatch(setLoader(true))
            const user: any = await dispatch(login({ userName: credendials.userName, password: credendials.password, isGoogle: true }))
            dispatch(setLoader(false))
            if (user) {
                navigate(`/mydata`)
            } else {
                dispatch(setLoader(true))
                const user: any = await dispatch(signup(credendials))
                dispatch(setLoader(false))
                if (user) {
                    navigate(`/mydata`)
                } else {
                    setErrors({ ...errors, userName: true, password: true })
                }
            }
        })()

    }

    const handleGoogleFail = () => {
        alertMessage('Something went wrong, try again later...', 'warning', 3500)
    }

    const switchFormState = () => {
        if (formState === 'signup') setFormState('login')
        else setFormState('signup')
    }

    const demoLogin = () => {
        (async () => {
            dispatch(setLoader(true))
            const user: any = await dispatch(login({ userName: 'DemoUser', password: '1234', isGoogle: false }))
            dispatch(setLoader(false))
            if (user) {
                navigate(`/mydata`)
            } else {
                setErrors(prevState => { return { ...prevState, userName: true, password: true } })
            }
        })()
    }


    const googleClientId: string = process.env.REACT_APP_GOOGLE_CLIENT_ID || ''

    return (
        <>
            <div className="homepage">
                <div className="left-side">
                    <h2 className="app-logo">MoneyPipe</h2>
                    <div className="prase">
                        <h3>Tracking your money</h3>
                        <h3>has never been so simple</h3>
                    </div>
                    <img src={graphSvg} alt="graph" />
                </div>
                <div className="right-side">
                    <h4 className="demo-user-btn">Watch the <span onClick={demoLogin}><b>demo</b></span></h4>
                    <h2 className="app-logo">MoneyPipe</h2>
                    <h4 className="form-state-header">{formState === 'signup' ? 'Have an account? ' : `Don't have an account? `}<span onClick={switchFormState}><b>{formState === 'signup' ? 'Login' : 'Signup'}</b></span></h4>
                    <h2 className="form-title">{formState === 'signup' ? 'Create account' : 'Login'}</h2>
                    <Box onChange={handleChange} component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} autoComplete="off">
                        <TextField autoComplete="off" label="user name" error={errors.userName} name="userName" value={formData.userName} helperText={errors.userName ? 'invalid username' : ''} />
                        {formState === 'signup' && <div className="name-fields">
                            <TextField autoComplete="off" label="first name" error={errors.firstName} name="firstName" value={formData.firstName} />
                            <TextField autoComplete="off" label="last name" error={errors.lastName} name="lastName" value={formData.lastName} />
                        </div>
                        }
                        <TextField autoComplete="off" type="password" label="password" error={errors.password} name="password" value={formData.password} helperText={errors.password ? 'invalid password' : ''} />
                        <Button onClick={formState === 'signup' ? handleSignup : handleLogin}>{formState === 'signup' ? 'Sign up' : 'Login'}</Button>
                    </Box>
                    <hr></hr>
                    <GoogleLogin
                        clientId={googleClientId}
                        buttonText='Continue with Google'
                        onSuccess={handleGoogleLogin}
                        onFailure={handleGoogleFail}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </div>
            <div className="dimmer-screen"></div>
        </>
    )
}
