import AccountsRepo from './accounts-repo.js'
const repo = new AccountsRepo()


export async function GET(request) {
    // EXTRACT THE QUERY STRINGS PART OF THE URL
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    // GET THE ACCOUNTS FROM THE ACCOUNTS REPO
    const accounts = await repo.getAccounts(type)

    //RETURN THE ACCOUNTS THAT YOU FOUND TO THE CLIENT
    return Response.json(accounts)
}
export async function POST(request) {
    const account = await request.json()

    const addedAccount = await repo.addAccount(account)

    return Response.json(addedAccount)
}
export async function PUT(request) {
    return new Response(`the PUT method is supported`)
}