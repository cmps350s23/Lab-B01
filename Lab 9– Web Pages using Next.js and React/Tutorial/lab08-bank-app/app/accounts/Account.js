import React from 'react'

export default function Account({ account, onDeleteAccount }) {
    return (
        <tr key={account.accountNo}>
            <td>{account.accountNo}</td>
            <td>{account.acctType}</td>
            <td>{account.balance}</td>
            <td>{account.balance <= 0 ?
                <button onClick={e => onDeleteAccount(account)}>
                    <i className="fas fa-trash"></i>
                </button> : ''}
            </td>
        </tr>
    )
}
