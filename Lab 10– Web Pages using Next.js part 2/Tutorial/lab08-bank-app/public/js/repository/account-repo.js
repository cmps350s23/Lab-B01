const baseUrl = '/api/accounts'

class AccountRepo {
    //returns all the accounts depending on the type the user selected
    async getAccounts(acctType) {
        const response = await fetch(`${baseUrl}?type=${acctType}`)
        return await response.json()
    }

    // 
    async deleteAccount(accountNo) {
        const response = await fetch(`${baseUrl}/${accountNo}`, {
            method: 'DELETE'
        })
        return await response.json()
    }

    async addAccount(account) {
        const response = await fetch(`${baseUrl}`, {
            method: 'POST',
            body: JSON.stringify(account),
            headers: { 'Content-type': 'application/json' }

        })
    }

    async updateAccount(account) {
        const response = await fetch(`${baseUrl}/${account.accountNo}`, {
            method: 'PUT',
            body: JSON.stringify(account),
            headers: { 'Content-type': 'application/json' }
        })
    }

    async addTrans(trans) {
        const response = await fetch(`${baseUrl}/${trans.accountNo}/trans`, {
            method: 'POST',
            body: JSON.stringify(trans),
            headers: { 'Content-type': 'application/json' }
        })
    }
}

export default new AccountRepo()