import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import imgCar from "../../assets/Images/carCartoonNew.jpg"
import axios from 'axios';

export default function ShowItem() {
    const [data, setdata] = useState({
        name: "",
        price: "",
        image: ""
    })
    const params = useParams()
    console.log(params);
    /*{ id: '1'}         id: "1"[[Prototype]]: Object */

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/items/${params.id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(res => {
            console.log(res.data)
            setdata(res.data.item)

        }).catch(error => console.log(error))

    }, [])


    /* object */
/*     const data = {
        id: 1,
        name: " car1",
        price: 200,
        image: imgCar
    }

 */



    return (
        <div>
            <h2>{data?.name}</h2>
            <p>{data?.price}</p>
            <img src={`http://127.0.0.1:8000/imagesItems/${data?.image}`} alt={data.name} />

        </div>
    )
}
