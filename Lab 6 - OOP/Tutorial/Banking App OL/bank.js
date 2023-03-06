const accounts = [
    { accountNo: 123, balance: 500, type: "Saving" },
    { accountNo: 234, balance: 4000, type: "Current" },
    { accountNo: 345, balance: 35000, type: "Current" },
    { accountNo: 456, balance: 60000, type: "Saving" },
]

export function deposit(accountNo, amount) {
    //index location 
    const index = accounts.findIndex(account => account.accountNo === accountNo)
    if (index >= 0)
        accounts[index].balance += amount
}

export function withdraw(accountNo, amount) {
    const account = getAccount(accountNo)
    if (account) account.balance -= amount
}

export function getAccount(accountNo) {
    return accounts.find(account => account.accountNo === accountNo)
}

export function deleteAccount(accountNo) {
    const index = accounts.findIndex(account => account.accountNo === accountNo)
    if (index >= 0) accounts.splice(index, 1)
}

export function sumBalance() {
    return accounts.reduce((acc, curr) => acc + curr.balance, 0)
}
export function averageBalance() {
    return sumBalance() / accounts.length
}

export function addAccount(account) {
    accounts.push(account)
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



