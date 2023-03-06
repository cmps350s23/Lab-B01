const accounts = [
    { accountNo: 123, balance: 500, type: "Saving" },
    { accountNo: 234, balance: 4000, type: "Current" },
    { accountNo: 345, balance: 35000, type: "Current" },
    { accountNo: 456, balance: 60000, type: "Saving" },
]

export function deposit(accountNo, amount) {
    //index location 
    // const index = accounts.findIndex(account => account.accountNo === accountNo)
    // if (index >= 0)
    //     accounts[index].balance += amount

    const account = accounts.find(account => account.accountNo === accountNo)
    if (account)
        account.balance += amount
}

export function display() {
    console.log(accounts);
}

export function toJSON() {
    return JSON.stringify(accounts)
}

export function fromJSON(accountJSON) {
    return JSON.parse(accountJSON)
}



