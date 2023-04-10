'use client'

import React, { useState } from 'react'
import styles from '../page.module.css'
import Account from './Account'

export default function Accounts({ initialAccounts }) {
    const [accounts, setAccounts] = useState(initialAccounts)

    async function handleTypeChange(e) {
        const acctType = e.target.value
        const response = await fetch(`/api/accounts?type=${acctType}`)
        const filteredAccounts = await response.json()
        setAccounts(filteredAccounts)
    }

    return (
        <main id="main" className={styles.main}>
            <label htmlFor="acctType"> Account Type </label>
            <select id="acctType" className={styles.dropdown} onChange={(e) => handleTypeChange(e)}>
                <option value="All">All</option>
                <option value="Saving">Saving</option>
                <option value="Current">Current</option>
            </select>
            {/* the accounts list */}
            <table id="accounts" className={styles.table}>
                <tr>
                    <th>Account No</th>
                    <th>Account Type</th>
                    <th>Balance</th>
                    <th>Action</th>
                </tr>
                {accounts.map(account => <Account account={account}></Account>)}
            </table>
        </main>
    )
}
