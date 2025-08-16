"use client"

import styles from './page.module.css'
import Link from 'next/link'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useParams } from 'next/navigation'

export default function Form() {
    const [data, setData] = useState({name:"",price:"",count:"",url:null})
    const [file,setFIle] = useState(null)
    const {name, price, count, url} = data
    const [newPic,setNewPic] = useState(false)
    const params = useParams()
    const { id } = params

    const inputValue =(topic)=>{
        if(topic !== "url"){
            return (e)=>setData({...data,[topic]:e.target.value})
        }
        else{
            return (e)=> {
                setFIle(e?.target?.files[0])
                setNewPic(true)
            }
        }
    }

    const getSingle = async()=>{
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/admin/singleData/${id}`)
            setData({
                name:res.data.name,
                price:res.data.price,
                count:res.data.count,
            })
            setFIle(res.data.url)
        }
        catch(err) {
            console.log(err);
        }
    }

    const sendData = async (e)=>{
        e.preventDefault()

        try {
            if(newPic){
                const formdata = new FormData()
                formdata.append("file",file)
                formdata.append("upload_preset", "upload"); 

                const res = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,formdata)
                await axios.put(`${process.env.NEXT_PUBLIC_API}/admin/updateData/${id}`,{...data,url:res.data.secure_url})
                Swal.fire({
                    title: "อัพเดตสินค้าสำเร็จ",
                    icon: "success",
                    draggable: true
                });
            }
            else{
                await axios.put(`${process.env.NEXT_PUBLIC_API}/admin/updateData/${id}`,{...data,url:file})
                Swal.fire({
                    title: "อัพเดตสินค้าสำเร็จ",
                    icon: "success",
                    draggable: true
                });
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        getSingle()
    },[])

  return (
    <div className={styles.formContainer}>
        <h1 className='textmain'>แก้ไขสินค้า</h1>
        <form onSubmit={sendData}>
            <p>ชื่อสินค้า</p>
            <input type='text' onInput={inputValue('name')} value={name}></input>
            <p>ราคา</p>
            <input type='text' onInput={inputValue('price')} value={price}></input>
            <p>จำนวนสินค้าปัจจุบัน</p>
            <input type='text' onInput={inputValue('count')} value={count}></input>
            <p>รูปภาพ</p>
            <input type='file' onChange={inputValue('url')}></input>
            <button type='submit'>อัพเดตสินค้า</button>
        </form>
    </div>
  )
}
