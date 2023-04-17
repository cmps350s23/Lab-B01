import { Inter } from 'next/font/google'
import AccountsTable from './accounts/AccountsTable'
import accountsRepo from './api/accounts/accounts-repo'

const inter = Inter({ subsets: ['latin'] })


export default async function Home() {
  const accounts = await accountsRepo.getAccounts()

  return (
    <div>
      <main id="main">
        <AccountsTable initialAccounts={accounts}></AccountsTable>
      </main>
    </div>
  )
}
