"use client"
import styles from './page.module.css'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className={styles.adminContainer}>
        <h1 className='textmain'>Admin Page</h1>
        <div className={styles.but}>
            <Link href="/dashboard/form"><button>เพิ่มสินค้า</button></Link>
            <Link href="/manage"><button>จัดการสินค้า</button></Link>
        </div>
    </div>
  )
}
