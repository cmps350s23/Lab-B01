import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import accountRepo from './api/accounts/accounts-repo'

export default async function Home() {
  // get the data from the repo
  const accounts = await accountRepo.getAccounts()

  return (
    <div>
      {accounts.map(account => <p> {account.accountNo} </p>)}
    </div>
  )
}
