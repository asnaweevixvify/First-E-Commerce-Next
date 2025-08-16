"use client"

import styles from "./page.module.css";
import Link from "next/link";

export default function Nav() {
  return (
    <div className={styles.navcontainer}>
        <ul>
            <Link href='/'><li>หน้าหลัก</li></Link>
            <Link href='/cart'><li>ตะกร้าของคุณ</li></Link>
            <Link href='/history'><li>ประวัติการสั่งซื้อ</li></Link>
            <Link href='/dashboard'><li>แอดมิน</li></Link>
            <Link href='/login'><li>เข้าสู่ระบบ</li></Link>
        </ul>
    </div>
  )
}
