import { log } from 'console'
import fs from 'fs-extra'
import { nanoid } from 'nanoid'
import path from 'path'
import { AccountType } from '@prisma/client'

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class AccountsRepo {
    constructor() {

    }

    async getAccounts(type) {
        try {
            // await this.getOwners()
            // await this.getAvgBalance()
            // this.deleteOwner("dfghfrjki756gh")
            // const owners = await this.searchOwner('J D')
            // this.getTrans('rsfrg2fprksfrg2fpt', '2021-05-16T10:00:00.000Z', '2021-11-17T10:00:00.000Z')
            // await this.getMinMaxBalance()
            // await this.getTransSum('rsfrg2fprksfrg2fpt', '2021-05-16T10:00:00.000Z', '2021-11-17T10:00:00.000Z')
            // await this.getTop3Accounts()
            await this.getOwnerReport('ckockkdifg2fpt')

            let accounts = []
            if (type == 'Savings' || type == 'Current') {
                console.log('I am inside getAccounts trying to query the database', type);
                return await prisma.account.findMany({
                    where: {
                        acctType: type
                    }
                }
                    // {
                    //     select: {
                    //         accountNo: true,
                    //         acctType: true,
                    //         balance: true
                    //     },
                    // }
                )
            }
            return await prisma.account.findMany(
                {
                    include: {
                        Owner: true
                    }
                }
            )
        }
        catch (err) {
            console.log(err);
            return { error: err.message }
        }

    }

    async addAccount(account) {
        try {
            const newAccount = await prisma.account.create({
                data: account
            })
            return newAccount
        } catch (error) {
            return { error: error.message }
        }
    }

    async updateAccount(account, accountNo) {
        // update account
        console.log('updateAccount called', accountNo);
        const updatedAccount = await prisma.account.update({
            where: { accountNo },
            data: account
        })

        if (updatedAccount)
            return "updated successfully"

        return "Unable to update account because it does not exist"
    }

    async getAccount(accNo) {
        console.log('getAccount called');
        const account = await prisma.account.findUnique({
            where: {
                accountNo: accNo
            }
        })

        if (account) return account
        else return { errorMessage: 'Account does not exit' }
    }

    async deleteAccount(accNo) {
        try {
            const count = await prisma.account.delete({
                where: {
                    accountNo: accNo
                }
            })
            return "deleted successfully"
        } catch (err) {
            console.log(err);
            return "Unable to delete account because it does not exist"
        }

    }

    async addTransaction(transaction, accountNo) {
        console.log('addTransaction called', accountNo);
        transaction.amount = parseInt(transaction.amount.toString());
        try {
            const account = await this.getAccount(accountNo);
            console.log(account);

            if (transaction.transType == 'Deposit')
                account.balance += parseInt(transaction.amount);
            else
                account.balance -= parseInt(transaction.amount);

            await this.updateAccount(account, accountNo);
            const newTransaction = await prisma.transaction.create({
                data: transaction
            })

            return {
                message: 'transaction successful',
                newTransaction
            }

        } catch (err) {
            return {
                error: 'unable to execute the transaction successful',
                errorMessage: err.message
            }
        }
    }

    async getOwners() {
        try {
            return await prisma.owner.findMany()

        } catch (error) {
            console.log(error);
            return { error: error.message }
        }
    }

    async deleteOwner(ownerId) {
        try {
            const count = await prisma.owner.delete({ where: { id: ownerId } })

            console.log("DELETE OWNER: ", count);
            return "deleted successfully"

        } catch (error) {
            console.log(error);
            return { error: error.message }
        }

    }
    async searchOwner(fullName) {

        const [firstName, lastName] = fullName.split(' ')

        console.log('FirstName ', firstName, 'LastName', lastName);

        try {
            const owners = await prisma.owner.findMany({
                where: {
                    firstName: {
                        contains: firstName
                    },
                    lastName: {
                        contains: lastName
                    }
                }
            }
            )
            console.log(owners);
            return owners

        } catch (error) {
            console.log(error);
            return { error: error.message }
        }

    }
    async getTrans(accountNo, fromDate, toDate) {

        try {
            const transactions = await prisma.transaction.findMany({
                where: {
                    accountNo,
                    date: {
                        gte: new Date(fromDate).toISOString(),
                        lte: new Date(toDate).toISOString(),
                    },
                    amount: {
                        gte: 500,
                        lte: 1000,
                    }

                },
                include: { Account: { include: { Owner: true } } }
            })
            console.log('Account with account No ', accountNo, 'transactions are ', JSON.stringify(transactions, null, 2));
            return transactions

        } catch (error) {
            console.log(error);
            return { error: error.message }
        }

    }
    async getMinMaxBalance() {
        try {
            const minMaxBalance = await prisma.account.aggregate({
                _min: { balance: true },
                _max: { balance: true },
                _count: { accountNo: true },
                _sum: { balance: true },
                _avg: { balance: true }
            })

            console.log(minMaxBalance);
            return minMaxBalance
        } catch (error) {
            console.log(error);
            return { error: error.message }
        }
    }

    async getTransSum(accountNo, fromDate, toDate) {
        try {
            const transactionSums = await prisma.transaction.groupBy({
                by: ['transType'],
                where: {
                    accountNo,
                    date: {
                        gte: new Date(fromDate).toISOString(),
                        lte: new Date(toDate).toISOString(),
                    }
                },
                _sum: { amount: true }
            })
            console.log(transactionSums);
        } catch (error) {
            console.log(error);
            return { error: error.message }
        }
    }
    async getAvgBalance() {
        try {
            const avgBalancePerAccountType = await prisma.account.groupBy({
                by: ['acctType'],
                _avg: { balance: true }
            })

            console.log(avgBalancePerAccountType);
            return avgBalancePerAccountType

        } catch (error) {
            console.log(error);
            return { error: error.message }
        }
    }
    async getTop3Accounts() {
        try {
            const top3 = await prisma.account.findMany({
                orderBy: { balance: 'desc' },
                take: 3
            })
            console.log(top3);
        } catch (error) {
            console.log(error);
            return { error: error.message }
        }
    }

    async getOwnerReport(ownerId) {
        try {
            const owner = await prisma.owner.findUnique({
                where: { id: ownerId },
                include: {
                    accounts: {
                        include: {
                            transactions: true
                        }
                    }
                }
            })
            console.log(JSON.stringify(owner, null, 2));
        } catch (error) {
            console.log(error);
            return { error: error.message }
        }
    }
}

