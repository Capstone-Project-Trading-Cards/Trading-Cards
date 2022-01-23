import { useNavigate } from 'react-router'
import React, { useEffect } from 'react'
import axios from 'axios';

export default function Login() {
    const navigate = useNavigate()

    function handleLogin(e) {
        e.preventDefault()

        const form = e.target;
        /*const user = {
            username: form[0].value,
            password: form[1].value
        }
        console.log(user)
        */

        

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
            console.log(data)
            //localStorage.clearItem("token")
            localStorage.setItem("token", data.token)
        })
        .then(res => navigate('/'))
    }

    return(
        <form onSubmit={event => handleLogin(event)}>
            <input required type="text"/>
            <input required type="password"/>
            <input type="submit" value="Submit"/>
        </form>
    )
}