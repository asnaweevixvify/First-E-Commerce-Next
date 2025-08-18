"use client"

import styles from './page.module.css'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Image from "next/image";
import { FaPlus,FaMinus } from "react-icons/fa6";
import Swal from 'sweetalert2';
import alert from './confirmAlert';

export default function Cart() {
    const [data,setData] = useState([])
    const [cart,setCart] = useState([])

    const getCart = async()=>{
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/cart/getCart`)
            setData(res.data)
            const newCart = res.data.map(e=>{
              return {id:e.id,count:e.count}
            })
            setCart(newCart)
        }
        catch(err) {
            console.log(err);
        }
    }

    const increase=(id)=>{
      const newCart = cart.filter(e=>e !== null).map((e)=>{
        if(e.id === id){
          const newCount = e.count + 1
  
          try {
            axios.patch(`${process.env.NEXT_PUBLIC_API}/cart/changeCount/${id}`,{count:newCount})
          }
          catch(err) {
            console.log(err);
          }
  
          return {id,count:newCount}
        }
        return e
      })
      setCart(newCart)
    }
  
    const decrease=(id)=>{
      const newCart = cart.filter(e=>e !== null).map((e)=>{
        if(e.count === 1 && e.id === id){
         
          try {
            axios.delete(`${process.env.NEXT_PUBLIC_API}/cart/removeCart/${id}`)
          }
          catch(err) {
            console.log(err);
          }
  
          return null
        }
        else if(e.id === id){
          const newCount = e.count - 1
  
          try {
            axios.patch(`${process.env.NEXT_PUBLIC_API}/cart/changeCount/${id}`,{count:newCount})
          }
          catch(err) {
            console.log(err);
          }
  
          return {id,count:newCount}
        }
        return e
      }).filter(e=>e !== null)
      setCart(newCart)
    }

    const confirmRemove = (id)=>{
      Swal.fire(alert).then((result) => {
        if (result.isConfirmed) {
          delCart(id)
        }
      });
    }

    const delCart=async(id)=>{
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API}/cart/removeCart/${id}`)
        Swal.fire({
          title: "ลบสินค้าสำเร็จ",
          icon: "success",
          draggable: true
        });
        getCart()
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
        <h1 className="textmain">ตะกร้าของคุณ</h1>
        <div className={styles.products_container}>
            {data.map((e,index)=>{
              const finded = cart.find(product=>product.id===e.id)
              if(finded){
                return(
                  <div className={styles.product_box} key={index}>
                    <Image src={e.url} width={150} height={100} alt="bag"></Image>
                    <h3>ชื่อสินค้า : {e.name}</h3>
                    <h3>ราคา : {e.price} บาท</h3>
                    <div className={styles.count}>
                          <FaMinus style={{cursor:'pointer'}} onClick={()=>decrease(e.id)} />
                          <h1>{finded.count}</h1>
                          <FaPlus style={{cursor:'pointer'}} onClick={()=>increase(e.id)} />
                    </div>
                    <button className={styles.del} onClick={()=>confirmRemove(e.id)}>ลบสินค้า</button>
                  </div>
                )
              }
            })}
        </div>
    </div>
  )
}
