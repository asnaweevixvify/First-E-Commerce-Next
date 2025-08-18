"use client"

import styles from './page.module.css'
import Link from 'next/link'
import { useState,useEffect } from 'react'

export default function Login() {
  const [userData,setUserData] = useState({name:"",password:""})
  const {name, password} = userData
  const [canSend,setCanSend] = useState(false)

  const inputValue = (topic)=>{
    return (e) => setUserData({...userData,[topic]:e.target.value})
  }

  useEffect(()=>{
    if(!name || !password || !confirm){
      setCanSend(false)
    }
    else{
      setCanSend(true)
    }
  },[name,password,confirm])

  return (
    <div className={styles.login_container}>
        <h1 className='textmain'>เข้าสู่ระบบ</h1>
        <form>
            <p>ชื่อผู้ใข้</p>
            <input type='text' onInput={inputValue("name")}></input>
            <p>รหัสผ่าน</p>
            <input type='passord' onInput={inputValue("password")}></input>
            <button type='submit' disabled={!canSend}>เข้าสู่ระบบ</button>
        </form>
        <div className={styles.des}>
                <p>ยังไม่มีบัญชี</p>
                <Link href="/register"><p>สร้างบัญชี</p></Link>
            </div>
    </div>
  )
}
