"use client"

import styles from "./page.module.css";
import Image from 'next/image'
import axios from "axios";
import { useState,useEffect } from "react";
import Swal from "sweetalert2";
import alert from "./confirmAlert";
import Link from "next/link";

export default function Home() {
  const [data,setData] = useState([])

  const getData = async()=>{
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/admin/getData`)
    setData(res.data)
  }

  const confirmDel=(id)=>{
    Swal.fire(alert).then((result) => {
      if (result.isConfirmed) {
        delItem(id)
      }
    });
  }

  const delItem = async(id)=>{
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API}/admin/deleteData/${id}`)
      Swal.fire({
        title: "ลบสินค้าสำเร็จ",
        icon: "success",
        draggable: true
      });
      getData()
    }
    catch(err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <div>
        <h1 className="textmain">จัดการสินค้า</h1>
        <div className={styles.products_container}>
            {data.map((e,index)=>{
              return(
                <div className={styles.product_box} key={index}>
                  <Image src={e.url} width={150} height={100} alt="bag"></Image>
                  <h3>ชื่อสินค้า : {e.name}</h3>
                  <h3>ราคา : {e.price} บาท</h3>
                  <h3>ยอดคงเหลือ : {e.count}</h3>
                  <button className={styles.del} onClick={()=>confirmDel(e.id)}>ลบสินค้า</button>
                  <Link href={`/dashboard/formedit/${e.id}`}><button className={styles.edit}>แก้ไขสินค้า</button></Link>
                </div>
              )
            })}
        </div>
    </div>
  );
}
