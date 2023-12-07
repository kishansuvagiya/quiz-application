import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Protect = (props) => {
    const navigate = useNavigate()
    const [token, setToken] = useState('')

    useEffect(() => {
        let getToken = localStorage.getItem('token')
        if (!getToken) {
            return navigate('/')
        }
        setTimeout(() => setToken(getToken), 1000)
    }, [])

    if (!token) {
        return <span className="loader"></span>
    }
    return props.children
}

export default Protect