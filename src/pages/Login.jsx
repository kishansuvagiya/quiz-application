import React, { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css'

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Too Short!')
        .max(10, 'Too Long!')
        .required('Username is Required'),
    email: Yup.string().email()
        .required('Email is Required'),
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

function Login() {
    const navigate = useNavigate()
    const [signUpValue, setSignUpValues] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [loginValue, setLoginValue] = useState({
        email: '',
        password: '',
    })

    const createNewUser = async (values) => {
        try {
            const res = await axios.post('https://quiz-api-y0nx.onrender.com/user/signup', values)
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
            setTimeout(() => {
                navigate('/category')
            }, 1000)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', res.data.data.username)
            console.log(res);

        } catch (error) {
            toast.error(error.message, {
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
    }
    const loginUser = async (values) => {
        try {
            const res = await axios.post('https://quiz-api-y0nx.onrender.com/user/login', values)
            toast.success(res.data.message, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                // icon: <LoginIcon sx={{ color: lightGreen['A400'] }} />
            });
            // setTimeout(() => {
                navigate('/category')
            // }, 1000)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', res.data.data.username)
            // console.log(res.data.token);

        }
        catch (error) {
            toast.error(error.message, {
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
    }

    const signup = () => {
        const container = document.getElementById('container');
        container.classList.add('right-panel-active');
    }
    const signIn = () => {
        const container = document.getElementById('container');
        container.classList.remove('right-panel-active');
    }

    return (
        <div className='login'>
            <div className="box-container" id="container">
                <div className="form-container sign-up-container">
                    <Formik
                        initialValues={signUpValue}
                        validationSchema={SignupSchema}
                        onSubmit={async (values) => {
                            await createNewUser(values)
                            // action.resetForm()
                            setSignUpValues({
                                username: '',
                                email: '',
                                password: '',
                            })
                        }}
                    >
                        <Form >
                            <h1 className='mb-5 text-2xl'>Create Account</h1>
                    
                            <Field type="text" placeholder="Username" name='username' />
                            <div className='errormsg'><ErrorMessage name='username' /></div>
                            <Field type="email" placeholder="Email" name='email' />
                            <div className='errormsg'><ErrorMessage name='email' /></div>
                            <Field type="password" placeholder="Password" name='password' />
                            <div className='errormsg'><ErrorMessage name='password' /></div>
                            <button type='submit' className='mt-5'>Sign Up</button>
                        </Form>
                    </Formik>
                </div>

                <div className="form-container sign-in-container">
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
                        <Form >
                            <h1 className='text-2xl mb-5'>Sign in</h1>
                           
                            <Field type="email" placeholder="Email" name='email'/>
                            <div className='errormsg'><ErrorMessage name='email' /></div>
                            <Field type="password" placeholder="Password" name='password' />
                            <div className='errormsg'><ErrorMessage name='password' /></div>
                            <a href="#">Forgot your password?</a>
                            <button type='submit'>Sign In</button>
                        </Form>
                    </Formik>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn" onClick={signIn}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" onClick={signup}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login