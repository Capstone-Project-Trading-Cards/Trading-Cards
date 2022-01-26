import { useNavigate } from 'react-router'
import React, { useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

export default function Register() {
    const navigate = useNavigate()

    async function handleRegister(e) {
        e.preventDefault()

        const form = e.target
        const user = {
            username: form[0].value,
            email: form[1].value,
            password: form[2].value
        }

        axios.post('/api/register', {
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(user)
        })
    }

    useEffect(() => {
        fetch("/getUsername", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? navigate('/login'): null)
    }, [])

    return(
        <div>
            <Navbar/>
            <form onSubmit={event => handleRegister(event)}>
                <input required type='text'/>
                <input required type='email'/>
                <input required type='password'/>
                <input type='submit' value='Register'/>
            </form>
            <small class="text-muted">Already have an account? <Link to="/login">Login</Link></small>
        </div>

    )

}