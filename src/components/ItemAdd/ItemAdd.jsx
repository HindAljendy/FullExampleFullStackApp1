import React, { useState } from 'react'
import './ItemAdd.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ItemAdd() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState({})
  const navigate = useNavigate();

  const sendData = (event) => {
    event.preventDefault();

    let data = { name: name, price: price, image: image }


    /*fetch */
    /* axios */
    axios.post("http://127.0.0.1:8000/api/add", data, {
      headers: {
        Authorization: localStorage.getItem("token"),
        'content-Type': 'multipart/form-data' /* لوجود ملف "صورة" */
      }
    })
      .then(res => {
        console.log(res)
       /* 1 */ navigate("/items") 
      }).catch(error => console.log(error))

  }
  return (
    <div className='ItemAdd'>
      <h1>Add Item</h1>
      <div className='FormADD'>
        <form onSubmit={(event) => sendData(event)}>
          <input type="text" placeholder='name' onChange={(event) => setName(event.target.value)} />
          <input type="text" placeholder='price' onChange={(event) => setPrice(event.target.value)} />

          <label htmlFor="image">Add image</label>
          <input type="file" id="image" onChange={(event) => setImage(event.target.files[0])} />

          <input type="submit" value="ADD" />
        </form>

      </div>

    </div>
  )
}


/* ليسمح باختيار اكثر من صورة من حقل الملفات :

    const [images, setImages] = useState([]); // تغيير هنا لتخزين أكثر من صورة
    console.log('Selected Images:', images);

    const handleFileChange = (event) => {
        const filesArray = Array.from(event.target.files); // تحويل ملف المدخل إلى مصفوفة
        setImages(filesArray); // تحديث الحالة لتخزين الملفات
    };

        <input
                type="file"
                onChange={handleFileChange}
                multiple // يسمح باختيار أكثر من ملف
            />



            onChange={Array.from(event.target.files)}



*/
