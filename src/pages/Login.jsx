import axios from 'axios';
import React, { useState } from 'react'
import './loginStyle.css'
import img from "./../assets/Images/H.jpg"
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const sendData = (event) => {
        event.preventDefault();

        /*Fetch */
        /*   fetch("http://127.0.0.1:8000/api/login", {
            method: "POST", // method should be in quotes
            headers: {
                "Content-Type": "application/json" // set Content-Type header
            },
            body: JSON.stringify({ "email": email, "password": password }) // JSON.stringify should be capitalized
        })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(error => console.error('Error:', error)); */ // handle errors

        /* axios */
        axios.post("http://127.0.0.1:8000/api/login", { "email": email, "password": password })
            .then(res => {
                console.log(res.data.token)
                /* 1 */ localStorage.setItem("token", "Bearer " + res.data.token)
                /* 2 */ navigate ("/")
            }).catch(error => console.log(error) )
    }
    return (
        <div className='login'>
            <form onSubmit={(event) => sendData(event)}>
                <img src={img} alt="Hind IMG" />
                <input type="text" placeholder='email' onChange={(event) => setEmail(event.target.value)} />
                <input type="password" placeholder='password' onChange={(event) => setPassword(event.target.value)} />
                <input type="submit" value="logIn" />
            </form>

        </div>
    )
}
