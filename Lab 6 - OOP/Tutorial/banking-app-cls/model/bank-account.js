export class BankAccount {
    constructor(balance) {
        this._balance = balance;
        this._accountNo = Math.floor(Math.random() * (1000) + 100)
    }

    getBalance() { return this._balance; }
    getAccount() { return this._accountNo; }

    withdraw(amount) {
        if (amount <= this._balance)
            this._balance -= amount
    }
    deposit(amount) {
        if (amount > 0)
            this._balance += amount
    }

    toString() {
        return `Acc No : ${this.getAccount()} Balance : ${this.getBalance()}`
    }
}

