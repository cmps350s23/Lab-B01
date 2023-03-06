import { BankAccount } from "./bank-account.js";

export class SavingAccount extends BankAccount {
    static minBalance = 500
    static benefitPercentage = 0.05

    constructor(balance) {
        super(balance)
    }

    distributeBenefit() {
        let updatedBalance = this.getBalance()
        updatedBalance += balance * SavingAccount.benefitPercentage
        this.setBalance(updatedBalance)
    }
}