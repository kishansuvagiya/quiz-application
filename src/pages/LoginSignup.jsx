import React, { useState } from 'react'
import '../components/styles/LoginSignup.css'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import login from '../components/other/login.svg'
import signup from '../components/other/signup.svg'

const SignupSchema = Yup.object().shape({
    fullname: Yup.string()
        .min(2, 'Too Short!')
        .max(30, 'Too Long!')
        .required('Fullname is Required'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is Required')
        .trim(),
    password: Yup.string()
        .min(6, 'Minimum 6 character required')
        .required('Password is Required'),
    // .matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*[\]{}()?"\\,><':;|_~`=+-])[a-zA-Z\d!@#$%^&*[\]{}()?"\\,><':;|_~`=+-]{6,99}$/,
    //     'Must contain at least 6 Characters, 1 Uppercase, 1 Lowercase, 1 Special Character, and 1 Number'
    //   ),
    // cpassword: Yup.string()
    //     .required('Confirm Password is Required')
    //     .oneOf([Yup.ref('password')], 'Passwords must match'),
});
const loginSchema = Yup.object().shape({
    email: Yup.string().email()
        .required('Email is Required'),
    password: Yup.string()
        .min(6, 'Minimum 6 character required')
        .required('Password is Required')
});

function LoginSignup() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [signUpValue, setSignUpValues] = useState({
        fullname: '',
        email: '',
        password: '',
    })
    const [loginValue, setLoginValue] = useState({
        email: '',
        password: '',
    })

    const createNewUser = async (values) => {
        setIsLoading(true);
        try {
            const res = await axios.post('https://quiz-api-y0nx.onrender.com/user/signup', values)
            if (res.data.status == 'success') {
                navigate('/category')
            }
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', res.data.data.fullname)
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
            console.log(res);
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
            setIsLoading(false);
        }
    }
    const loginUser = async (values) => {
        setIsLoading(true);
        try {
            const res = await axios.post('https://quiz-api-y0nx.onrender.com/user/login', values)
            if (res.data.status == 'success') {
                navigate('/category')
            }
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', res.data.data.fullname)
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
            // console.log(res.data.token);
        }
        catch (error) {
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
            setIsLoading(false);
        }
    }

    const toggle = () => {
        const container = document.querySelector('.login-container');
        container.classList.toggle('active');
    }
    return (
        <div>
            <section>
                <div class="login-container" >

                    {/* ---------------------- login -------------------------- */}
                    <div class="user signinBx">
                        <div class="imgBx"><img src={login} /></div>
                        <div class="formBx">
                            <Formik
                                initialValues={loginValue}
                                validationSchema={loginSchema}
                                onSubmit={async (values) => {
                                    await loginUser(values)
                                    // action.resetForm()
                                    setLoginValue({
                                        email: '',
                                        password: '',
                                    })
                                }}
                            >
                                <Form action="" onsubmit="return false;">
                                    <h2>Sign In</h2>
                                    <Field type="email" placeholder="Email" name='email' />
                                    <div className='errormsg'><ErrorMessage name='email' /></div>
                                    <Field type="password" placeholder="Password" name='password' />
                                    <div className='errormsg'><ErrorMessage name='password' /></div>
                                    <div className='text-right'><Link to='/forgot-password' className='text-[#677eff] hover:text-[#2b49f5]'>Forgot Password ?</Link></div>
                                    {isLoading ?
                                        <button className='loading-btn' disabled>
                                            <i className="fa fa-spinner fa-spin"></i>Loading
                                        </button> :
                                        <button className='btn'>Login</button>}
                                    <p class="signup">
                                        Don't have an account ?
                                        <Link onClick={toggle}> Sign Up.</Link>
                                    </p>
                                </Form>
                            </Formik>
                        </div>
                    </div>

                    {/* ---------------------- signup -------------------------- */}
                    <div class="user signupBx">
                        <div class="formBx">
                            <Formik
                                initialValues={signUpValue}
                                validationSchema={SignupSchema}
                                onSubmit={async (values) => {
                                    await createNewUser(values)
                                    // action.resetForm()
                                    setSignUpValues({
                                        fullname: '',
                                        email: '',
                                        password: '',
                                    })
                                }}
                            >
                                <Form action="" onsubmit="return false;">
                                    <h2>Create an account</h2>
                                    <Field type="text" placeholder="Fullname" name='fullname' />
                                    <div className='errormsg'><ErrorMessage name='fullname' /></div>
                                    <Field type="email" placeholder="Email" name='email' />
                                    <div className='errormsg'><ErrorMessage name='email' /></div>
                                    <Field type="password" placeholder="Password" name='password' />
                                    <div className='errormsg'><ErrorMessage name='password' /></div>
                                    {isLoading ?
                                        <button className='loading-btn' disabled>
                                            <i className="fa fa-spinner fa-spin"></i>Loading
                                        </button> :
                                        <button className='btn'>Signup</button>}
                                    <p class="signup">
                                        Already have an account ?
                                        <Link onClick={toggle}> Sign in.</Link>
                                    </p>
                                </Form>
                            </Formik>
                        </div>
                        <div class="imgBx"><img src={signup} /></div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LoginSignup