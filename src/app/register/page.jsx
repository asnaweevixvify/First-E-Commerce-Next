"use client"

import styles from './page.module.css'
import Link from 'next/link'
import { useState,useEffect } from 'react'

export default function Register() {
  const [userData,setUserData] = useState({name:"",password:""})
  const {name, password} = userData
  const [confirm,setConfirm] = useState("")
  const [canSend,setCanSend] = useState(false)

  const inputValue = (topic)=>{
    return (e) => setUserData({...userData,[topic]:e.target.value})
  }

  useEffect(()=>{
    if(!name || !password || !confirm){
      setCanSend(false)
    }
    else if(password !== confirm){
      setCanSend(false)
    }
    else{
      setCanSend(true)
    }
  },[name,password,confirm])

  return (
    <div className={styles.login_container}>
        <h1 className='textmain'>สร้างบัญชี</h1>
        <form>
            <p>ชื่อผู้ใข้</p>
            <input type='text' onInput={inputValue("name")}></input>
            <p>รหัสผ่าน</p>
            <input type='password' onInput={inputValue("password")}></input>
            <p>ยืนยันรหัสผ่าน</p>
            <input type='password' onInput={(e)=>setConfirm(e.target.value)}></input>
            <button type='submit' disabled={!canSend}>สร้างบัญชี</button>
        </form>
        <div className={styles.des}>
                <p>มีบัญชีอยู่แล้ว</p>
                <Link href="/login"><p>เข้าสู่ระบบ</p></Link>
            </div>
    </div>
  )
}
