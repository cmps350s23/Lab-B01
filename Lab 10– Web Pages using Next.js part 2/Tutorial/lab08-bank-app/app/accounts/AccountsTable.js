'use client'
import { React, useState } from 'react'
import Account from './Account'
import styles from '../page.module.css'


export default function AccountsTable({ initialAccounts }) {
    const [accounts, setAccounts] = useState(initialAccounts)

    async function handleTypeChange(type) {
        const data = await fetch(`/api/accounts?type=${type}`)
        const filterAccounts = await data.json()
        setAccounts(filterAccounts)
    }

    async function handleDelete(accountNo) {
        if (confirm('Are you sure you want to delete this account?') === false) return

        const response = await fetch(`/api/accounts/${accountNo}`, {
            method: 'DELETE'
        })
        await handleTypeChange('All')
    }
    return (
        <div>
            <label htmlFor="acctType"> Account Type</label>
            <select id="acctType" className="dropdown" onChange={e => handleTypeChange(e.target.value)}>
                <option value="All">All</option>
                <option value="Saving">Saving</option>
                <option value="Current">Current</option>
            </select>
            <table id="accounts" className={styles.table}>
                <thead>
                    <tr>
                        <th>Account No</th>
                        <th>Account Type</th>
                        <th>Balance</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map(account =>
                        <Account
                            account={account}
                            onDelete={handleDelete}
                            key={account.accountNo}>
                        </Account>
                    )}
                </tbody>
            </table>

        </div>
    )
}
