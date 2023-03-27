export async function GET(request) {
    const account = {
        accountNo: 2002,
        acctType: "Saving",
        balance: 8000,
        minimumBalance: 1000
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')


    return new Response(`the search query parameters are = ${type}`)
}