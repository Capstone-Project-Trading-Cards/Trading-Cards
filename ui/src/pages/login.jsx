import { useNavigate } from 'react-router'
import React, { useEffect } from 'react'
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate()

    function handleLogin(e) {
        e.preventDefault()

        const form = e.target;

        axios.post('/api/login', {
            headers: {
                'Content-Type': "application/json"
            },
            body: {
                username: form[0].value,
                password: form[1].value
            }
        })
        .then((res) => res.data)
        .then(data => {
            console.log(`data from api login ${data}`)
            localStorage.setItem("token", data.token)
        })
        .then(res => navigate('/'))
    }

    return(
        <div>
            <Navbar/>
            <form onSubmit={event => handleLogin(event)}>
                <input required type="text"/>
                <input required type="password"/>
                <input type="submit" value="Submit"/>
            </form>
            <small class="text-muted">Don't have an account? <Link to="/register">Register</Link></small>
        </div>

    )
}