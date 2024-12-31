import './Sidebar.css'
import { Link, useNavigate } from 'react-router-dom'
import Img from './../../assets/Images/H.jpg'
import axios from 'axios'

export default function SideBar() {
    const navigate= useNavigate()

    const logout = () => {
        /* axios */
        axios.post("http://127.0.0.1:8000/api/logout",null, { 
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        })
            .then(res => {
                console.log(res)
             /* 1 */ localStorage.removeItem("token")
             /* 2 */ navigate("/login")
            }).catch(error => console.log(error))
    }


    return (
        <div>
            <img src={Img} alt="Hind IMG" />
            <ul>
                <li><Link to="/items">items</Link></li>
                <li>
                    <button onClick={logout}>logout</button>
                </li>
            </ul>

        </div>
    )
}
