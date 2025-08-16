"use client"

import styles from "./page.module.css";
import Image from 'next/image'
import axios from "axios";
import { useState,useEffect } from "react";

export default function Home() {
  const [data,setData] = useState([])
  const [cart,setCart] = useState([])

  const getData = async()=>{
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/admin/getData`)
    setData(res.data)
  }

  const addToCart =(id)=>{
    const newCart = [...cart]
    newCart.push({id,count:1})
    setCart(newCart)
  }

  const increase=(id)=>{
    const newCart = cart.filter(e=>e !== null).map((e)=>{
      if(e.id === id){
        const newCount = e.count + 1
        return {id,count:newCount}
      }
      return e
    })
    setCart(newCart)
  }

  const decrease=(id)=>{
    const newCart = cart.filter(e=>e !== null).map((e)=>{
      if(e.count === 1 && e.id === id){
        return null
      }
      else if(e.id === id){
        const newCount = e.count - 1
        return {id,count:newCount}
      }
      return e
    }).filter(e=>e !== null)
    setCart(newCart)
  }

  useEffect(()=>{
    getData()
  },[])

  useEffect(()=>{
    console.log(cart);
  },[cart])

  return (
    <div>
        <h1 className="textmain">E-Commerce ระบบสั่งซื้อสินค้า</h1>
        <div className={styles.products_container}>
            {data.map((e,index)=>{
              const finded = cart.find(product=>product?.id === e.id)
              if(finded){
                return(
                  <div className={styles.product_box} key={index}>
                    <Image src={e.url} width={250} height={200} alt="bag"></Image>
                    <h3>ชื่อสินค้า : {e.name}</h3>
                    <h4>ราคา : {e.price} บาท</h4>
                    <h5>ยอดคงเหลือ : {e.count}</h5>
                    <div className={styles.count}>
                        <h1 onClick={()=>decrease(e.id)}>-</h1>
                        <h1>{finded.count}</h1>
                        <h1 onClick={()=>increase(e.id)}>+</h1>
                    </div>
                  </div>
                )
              }
              else{
                return(
                  <div className={styles.product_box} key={index}>
                    <Image src={e.url} width={250} height={200} alt="bag"></Image>
                    <h3>ชื่อสินค้า : {e.name}</h3>
                    <h4>ราคา : {e.price} บาท</h4>
                    <h5>ยอดคงเหลือ : {e.count}</h5>
                    <button onClick={()=>addToCart(e.id)}>ใส่ตะกร้า</button>
                  </div>
                )
              }
            })}
        </div>
    </div>
  );
}
