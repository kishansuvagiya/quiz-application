import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import forgotSVG from '../components/other/forgot_password.svg'
import axios from 'axios';

function ForgotPassword() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: ''
    })
    const [newData, setNewData] = useState({
        email: data.email,
        otp: '',
        newPassword: ''
    })
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [validateOTP, setValidateOTP] = useState(false);

    // ________________ send OTP ________________
    const dataHandler = (e) => {
        const { name, value } = e.target
        setData({
            ...data, [name]: value
        })
        setErrorMessage('')
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!data.email) {
            setErrorMessage('Email is required.')
            return
        }
        setIsLoading(true)
        try {
            const res = await axios.post('https://quiz-api-y0nx.onrender.com/user/forgot-password', data)
            if (res.data.status == 'success') {
                setValidateOTP(true)
                setNewData({ email: data.email })
                setErrorMessage('')
            }
            toast.success(res.data.message, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.log(error);
        }
        finally {
            setIsLoading(false)
        }

    }

    // ________________ verify OTP and new password ________________
    const newDataHandler = (e) => {
        const { name, value } = e.target
        setNewData({
            ...newData, [name]: value
        })
        setErrorMessage('')
    }
    const otpHandler = async (e) => {
        e.preventDefault()
        if (!newData.otp || !newData.newPassword) {
            setErrorMessage('Otp and New Password are required.')
            return
        }
        setIsLoading(true)
        try {
            const res = await axios.post('https://quiz-api-y0nx.onrender.com/user/verify-otp', newData)
            toast.success(res.data.message, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            if (res.data.status == 'success') {
                setTimeout(() => {
                    navigate('/')
                }, 1500);
            }

        } catch (error) {
            toast.error(error.response.data.message, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.log(error);
        }
        finally {
            setIsLoading(false)
        }

    }
    return (
        <div>
            <section>
                <div class="login-container" >

                    {/* ---------------------- login -------------------------- */}
                    <div class="user signinBx">
                        <div class="imgBx"><img src={forgotSVG} /></div>
                        <div class="formBx">
                            {validateOTP ? null :
                                <form onSubmit={handleSubmit}>
                                    <h2>Forgot Password</h2>
                                    <input type="email" placeholder="Email" name='email' value={data.email} onChange={dataHandler} />
                                    {errorMessage && <div className='errormsg'>
                                        <span>{errorMessage}</span>
                                    </div>}
                                    {isLoading ?
                                        <button className='loading-btn' disabled>
                                            <i className="fa fa-spinner fa-spin"></i>Loading
                                        </button> :
                                        <button className='btn'>Submit</button>}
                                    <p class="signup">
                                        Remember Password ?
                                        <Link to='/'> Sign in.</Link>
                                    </p>
                                </form>}

                            {validateOTP ?
                                <form onSubmit={otpHandler}>
                                    <h2>Forgot Password</h2>
                                    <input type="email" placeholder="Email" name='email' value={newData.email} onChange={newDataHandler} disabled />
                                    <input type="number" placeholder="OTP" name='otp' value={newData.otp} onChange={newDataHandler} />
                                    <input type="password" placeholder="New Password" name='newPassword' value={newData.newPassword} onChange={newDataHandler} />
                                    {errorMessage && <div className='errormsg'>
                                        <span>{errorMessage}</span>
                                    </div>}
                                    {isLoading ?
                                        <button className='loading-btn' disabled>
                                            <i className="fa fa-spinner fa-spin"></i>Loading
                                        </button> :
                                        <button className='btn'>Submit</button>}
                                    <p class="signup">
                                        Remember Password ?
                                        <Link to='/'> Sign in.</Link>
                                    </p>
                                </form>
                                : null}
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default ForgotPassword