"use client"

import styles from './page.module.css'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Image from "next/image";

export default function Cart() {
    const [data,setData] = useState([])

    const getCart = async()=>{
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/cart/getCart`)
            setData(res.data)
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        getCart()
    },[])

  return (
   <div>
        <h1 className="textmain">รถเข็น</h1>
        <div className={styles.products_container}>
            {data.map((e,index)=>{
              return(
                <div className={styles.product_box} key={index}>
                  <Image src={e.url} width={150} height={100} alt="bag"></Image>
                  <h3>ชื่อสินค้า : {e.name}</h3>
                  <h3>ราคา : {e.price} บาท</h3>
                  <h3>จำนวน : {e.count} ชิ้น</h3>
                </div>
              )
            })}
        </div>
    </div>
  )
}
