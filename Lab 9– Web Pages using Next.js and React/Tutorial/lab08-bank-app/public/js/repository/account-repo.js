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

    }

    async updateAccount(account) {

    }

    async addTrans(trans) {

    }
}

export default new AccountRepo()