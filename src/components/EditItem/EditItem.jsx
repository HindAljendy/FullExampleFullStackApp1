import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import imgCar from "../../assets/Images/carCartoonNew.jpg"
import axios from 'axios';

export default function EditItem() {
    const navigate = useNavigate()

    /* GET */
    const [data, setdata] = useState({
        name: "",
        price: "",
        image: ""
    })

    /* put */
    /*     const [name, setName] = useState("")
        const [price, setPrice] = useState("")
        const [image, setImage] = useState({}) */


    const params = useParams()
    console.log(params);
    /*{ id: '1'}         id: "1"[[Prototype]]: Object */


    useEffect(() => {
        /* api 1 */
        axios.get(`http://127.0.0.1:8000/api/items/${params.id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(res => {
            console.log(res.data.item)

            /* setdata(res.data.item) */
            setdata({
                ...data,
                name: res.data.item.name,
                price: res.data.item.price,
                image: res.data.item.image,
            })



        }).catch(error => console.log(error))
    }, [])

    const sendData = (event) => {
        event.preventDefault();

        /* ما بصير توصل للباك قيمة الاسم و السعر فارغة  :
            :  لهيك لازم ظبط بالفرونت 
             اذا المستخدم ما عدل على القيمة  =>  يوصل للباك القيمة القديمة السابقة */
        /*   let updatedata = {
                name: (name) ? name : data.item.name,
                price: (price) ? price : data.item.price,
                image: image,
                _method: "put"
            }
            console.log(updatedata);
   */

        /* create a //! FormData object in JavaScript to :
            prepare for sending the form data,
        likely in a POST request. 
            This is often used when you're submitting form data that includes file uploads or
            when you need to send data as multipart/form-data. 

            Sending Non-File Data: When appending non-file data, it's usually good practice to convert your values to strings, especially for objects, to prevent unexpected results.
            Form Encoding: The FormData application automatically sets the appropriate content type when it's sent via XMLHttpRequest or Fetch API. This means you do not need to manually set the Content-Type header, as it will be set to multipart/form-data.

          */

        //! The FormData object  :
        /*  built-in JavaScript object that allows you to easily construct a set of key/value pairs representing form fields and their values.
            This object is especially useful when you need to send form data to a server using XMLHttpRequest or the Fetch API with the multipart/form-data encoding type.

            You can create an instance of FormData either with or without an existing HTML form :
            const formData = new FormData(); // Empty FormData

            const formElement = document.querySelector('form');
            const formDataFromForm = new FormData(formElement);


            You can append data to the FormData object using the append() method:
            formData.append('key', 'value');
            formData.append('file', fileInput.files[0]); // If you are appending a file

         */

        const updatedata = new FormData();
        updatedata.append('name', String(data.name));
        updatedata.append('price', String(data.price));
        if (data.image) {
            updatedata.append('image', data.image);
        }
        updatedata.append('_method', 'PUT');
        console.log(updatedata);
        console.log("image", data.image);
        console.log("name", data.name);
        console.log("price", data.price);



        /* api 2 */ axios.post(`http://127.0.0.1:8000/api/update/${params.id}`, updatedata, {
            headers: {
                Authorization: localStorage.getItem("token"),
                'content-Type': 'multipart/form-data' /* لوجود ملف "صورة" */
            }
        }).then(res => {
            console.log(res.data)
            /* 1 */   navigate("/items")

        }).catch(error => console.log(error))

    }


    /* object */
    /*     const data = {
            id: 1,
            name: " car1",
            price: 200,
            image: imgCar
        }
     */

    const [imagePreview, setImagePreview] = useState(null); /* عرض الصورة */
    const [fileNameImage, setFileNameImage] = useState('لم يتم اختيار صورة'); /* عرض اسم الصورة */
    const handleFileChange = (e) => {
        const file = e.target.files?.[0]; // Use optional chaining to avoid runtime errors

        console.log(e.target.files);



        if (file) {
            setFileNameImage(file.name);
            setdata({
                ...data,
                image: file,
            });
            // إنشاء رابط مؤقت للصورة
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl); // تعيين رابط الصورة المعاينة

            console.log(file);
        } else {
            setFileNameImage('لم يتم اختيار صورة');
            setImagePreview(data.image);
        }
    };


    return (
        <div className='ItemAdd'>
            <h1>Edit Item</h1>
            <div className='FormADD'>
                <form onSubmit={(event) => sendData(event)}>
                    <input type="text" placeholder='name' onChange={(e) => setdata({ ...data, name: e.target.value })} value={data?.name} />

                    <input type="text" placeholder='price' onChange={(e) => setdata({ ...data, price: e.target.value })} value={data?.price} />

                    <label htmlFor="image">Edit image</label>
                    <input type="file" id="image" onChange={handleFileChange} />
                    {!imagePreview && data.image && (
                        <img
                            src={`http://127.0.0.1:8000/imagesItems/${data.image}`}
                            alt={data?.name}
                            style={{ width: '200px', marginRight: '10px' }}
                        />
                    )}

                    {/* عرض الصورة الجديدة في حالة وجودها */}
                    {imagePreview && (
                        <>
                            <img
                                src={imagePreview}
                                alt="صورة جديدة"
                                style={{ width: '200px', marginRight: '10px' }}
                            />
                            <div>{fileNameImage}</div>

                        </>
                    )}

                    <input type="submit" value="Edit" />
                </form>

            </div>


        </div>
    )
}
/* 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData(prevState => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    };



*/