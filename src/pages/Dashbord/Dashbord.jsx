import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './Dashbord.css'
import SideBar from '../../components/Sidebar/Sidebar'

const Dashbord = () => {
    const navigate = useNavigate()

    useEffect(() => {
      

        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, [])

    return (
        <div className='Dashbord'>
            <div className='Sidebar'><SideBar /></div>
            <div className='Container'>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashbord