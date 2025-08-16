"use client"

import styles from "./page.module.css";
import Image from 'next/image'
import axios from "axios";
import { useState,useEffect } from "react";

export default function Home() {
  const [data,setData] = useState([])

  const getData = async()=>{
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/admin/getData`)
    setData(res.data)
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <div>
        <h1 className="textmain">E-Commerce ระบบสั่งซื้อสินค้า</h1>
        <div className={styles.products_container}>
            {data.map((e,index)=>{
              return(
                <div className={styles.product_box} key={index}>
                  <Image src={e.url} width={250} height={200} alt="bag"></Image>
                  <h3>ชื่อสินค้า : {e.name}</h3>
                  <h4>ราคา : {e.price} บาท</h4>
                  <h5>ยอดคงเหลือ : {e.count}</h5>
                  <button>ใส่ตะกร้า</button>
                </div>
              )
            })}
        </div>
    </div>
  );
}
