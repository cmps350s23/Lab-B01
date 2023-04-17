'use client'
import React, { useEffect, useState } from 'react'

export default function Transaction() {
    const [accounts, setAccounts] = useState([])

    async function getAccounts() {
        const data = await fetch(`/api/accounts`)
        const downloadedAccounts = await data.json()
        setAccounts(downloadedAccounts)
    }

    useEffect(() => {
        getAccounts()
    }, accounts)

    return (
        <div>{JSON.stringify(accounts)}</div>
    )
}
