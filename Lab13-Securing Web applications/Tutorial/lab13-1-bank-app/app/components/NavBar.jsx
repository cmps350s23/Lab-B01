'use client'
import React from 'react'
import Link from 'next/link'
import styles from '../page.module.css'

export default function NavBar() {

    // get the session object and check if the user is logged in
    // add singout button 
    //also hide the nav bar if the user is not logged in

    return (
        <>
            <nav className={styles.nav}>
                <ul>
                    <li>Alpha Bank</li>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/accounts/trans">Add Transaction</Link></li>
                    <li><Link href="/accounts/report">Summary Reports</Link></li>
                </ul>
            </nav>
        </>

    )
}
