import React from 'react'
import styles from '../page.module.css'
export default function Accounts({ initialAccounts }) {
    return (
        <main id="main" className={styles.main}>
            <label htmlFor="acctType"> Account Type </label>
            <select id="acctType" className={styles.dropdown}>
                <option value="All">All</option>
                <option value="Saving">Saving</option>
                <option value="Current">Current</option>
            </select>
            {/* the accounts list */}
            <table id="accounts">
                <tr>
                    <th>Account No</th>
                    <th>Account Type</th>
                    <th>Balance</th>
                    <th>Action</th>
                </tr>
                {initialAccounts.map(account => <Account account={account}></Account>)}
            </table>

        </main>
    )
}
