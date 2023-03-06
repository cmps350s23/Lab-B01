import {
    deposit,
    toJSON,
    fromJSON,
    averageBalance,
    sumBalance,
    getAccount,
    deleteAccount
} from "../bank.js";

import { expect } from "chai";

describe("Banking System Test Cases", () => {
    it("Testing Deposit", () => {
        const oldBalance = getAccount(123).balance;
        deposit(123, 500)
        expect(getAccount(123).balance).equals(oldBalance + 500)
    })

    it("Testing Delete", () => {
        deleteAccount(123)
        expect(getAccount(123)).equals(undefined)
    })
})
