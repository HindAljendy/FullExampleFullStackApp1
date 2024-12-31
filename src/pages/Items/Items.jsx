import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import imgCar from "../../assets/Images/carCartoonNew.jpg"
import './Items.css'
import axios from 'axios'

export default function Items() {
  const navigate = useNavigate()
  const [data, setdata] = useState([])
  const [getAllItems, setGetAllItems] = useState(true)

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    axios.get("http://127.0.0.1:8000/api/items", {
      headers:{
        Authorization : localStorage.getItem("token")
      }
    })
    .then(res => {
        console.log(res.data)
        setdata(res.data)
  
    }).catch(error => console.log(error) )

  }, [getAllItems])

  /* const data = [
    {
      id: 1,
      name: " car1",
      price: 200,
      image: imgCar
    },
    {
      id: 2,
      name: " car2",
      price: 400,
      image: imgCar
    },

  ]
 */
  
  /* function "show" : navigate to another page .. */
  const show = (id) => {
    navigate(`/item/${id}`);
  }

  /* function "show" : navigate to another page .. */
  const edit = (id) => {
    navigate(`/item/edit/${id}`);
  }

  /* function "deleteElement" : delete the element and get all items  .. */
  const deleteElement = (id) => {
    /* axios */
    axios.delete(`http://127.0.0.1:8000/api/items/${id}`, {
      headers: {
          Authorization: localStorage.getItem("token"),      }
  }).then(res => {
      console.log(res.data)
      /* 1 */  setGetAllItems((prev)=> !prev)
  }).catch(error => console.log(error))
  }

  return (
    <div className='Items'>
      <div className="header">
        <h1>All items</h1>
        <Link to="/items/add">
          <button>Add Item</button>
        </Link>
      </div>
      <div className="tabel">
        <tabel>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>price</th>
              <th>image</th>
              <th>actions</th>
            </tr>

          </thead>
          <tbody>
            {
              data?.map((element, index) => {
                return (
                  <tr key={index}>
                    <td>{element.id}</td>
                    <td>{element.name}</td>
                    <td>{element.price}</td>
                    <td><img src={`http://127.0.0.1:8000/imagesItems/${element.image}`} alt={element.name} /></td>
                    <td>
                      <button onClick={() => show(element.id)}>show</button>
                      <button onClick={() => edit(element.id)}>update</button>
                      <button onClick={() => deleteElement(element.id)}>delete</button>
                    </td>
                  </tr>

                )
              })
            }



          </tbody>
        </tabel>
      </div>
    </div>
  )
}
