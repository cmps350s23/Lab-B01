import { log } from 'console'
import fs from 'fs-extra'
import { nanoid } from 'nanoid'
import path from 'path'

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default class AccountsRepo {
    constructor() {
        this.filePath = path.join(process.cwd(), 'app/data/accounts.json')
    }

    async getAccounts(acctType) {
        try {
            if (acctType == 'Saving' || acctType == 'Current')
                return await prisma.account.findMany({ where: { acctType } })
            return await prisma.account.findMany()
        }
        catch (err) {
            console.log(err);
            return { error: err.message }
        }
    }

    async addAccount(account) {
        try {
            const newAccount = await prisma.account.create({ data: account })
            return newAccount
        } catch (error) {
            return { error: error.message }
        }
    }

    async updateAccount(account, accountNo) {
        try {
            const updatedAccount = await prisma.account.update({
                where: { accountNo },
                data: account
            })
            return updatedAccount
        } catch (err) {
            return { error: err.message }
        }
    }

    async getAccount(accountNo) {
        try {
            return await prisma.account.findUnique({ where: { accountNo } })
        } catch (err) {
            return { error: err.message }
        }
    }

    async deleteAccount(accNo) {
        try {
            const count = await prisma.account.delete({ where: { accountNo: accNo } })
            if (count > 0)
                return "deleted successfully"

            return "Unable to delete account because it does not exist"
        } catch (err) {
            console.log(err);
            return "Unable to delete account because it does not exist"
        }

    }

    async addTransaction(transaction, accountNo) {

        try {
            const account = this.getAccount(accountNo)

            if (account) {
                if (transaction.transType == 'Deposit')
                    account.balance += parseFloat(transaction.amount);
                else
                    account.balance -= parseFloat(transaction.amount);

                await this.updateAccount(account, accountNo)
                return await prisma.transaction.create({ data: transaction })
            }

        } catch (err) {
            return {
                issue: 'unable to execute the transaction successful',
                reason: err.message
            }
        }
    }

}

