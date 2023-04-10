import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import accountRepo from './api/accounts/accounts-repo'
import AccountsList from './accounts/AccountsList'

export default async function Home() {
  // get the data from the repo
  const accounts = await accountRepo.getAccounts()

  return (
    <div>
      <AccountsList initialAccounts={accounts} />
    </div>
  )
}
