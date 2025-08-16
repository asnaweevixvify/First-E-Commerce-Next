"use client"

import styles from './page.module.css'
import Link from 'next/link'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function Form() {
    const [data, setData] = useState({name:"",price:"",count:"",url:null})

    const inputValue =(topic)=>{
        if(topic !== "url"){
            return (e)=>setData({...data,[topic]:e.target.value})
        }
        else{
            return (e)=>setData({...data,[topic]:e?.target?.files[0]})
        }
    }

    const sendData = async (e)=>{
        e.preventDefault()

        try {
            const formdata = new FormData()
            formdata.append("file",data.url)
            formdata.append("upload_preset", "upload"); 

            const res = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,formdata)
            const imageUrl = res.data.secure_url
            setData({...data,url:imageUrl})

            await axios.post(`${process.env.NEXT_PUBLIC_API}/admin/createData`,{...data,url:imageUrl})
            Swal.fire({
                title: "เพิ่มสินค้าสำเร็จ",
                icon: "success",
                draggable: true
              });
            
        }
        catch(err) {
            console.log(err);
        }
    }

  return (
    <div className={styles.formContainer}>
        <h1 className='textmain'>บันทึกสินค้า</h1>
        <form onSubmit={sendData}>
            <p>ชื่อสินค้า</p>
            <input type='text' onInput={inputValue('name')}></input>
            <p>ราคา</p>
            <input type='text' onInput={inputValue('price')}></input>
            <p>จำนวนสินค้าปัจจุบัน</p>
            <input type='text' onInput={inputValue('count')}></input>
            <p>รูปภาพ</p>
            <input type='file' onChange={inputValue('url')}></input>
            <button type='submit'>เพิ่มสินค้า</button>
        </form>
    </div>
  )
}
