import AccountsRepo from "../accounts-repo";

const repo = new AccountsRepo();

export async function GET(request, { params }) {
    try {
        const { id } = params;
        const account = await repo.getAccount(id)
        return Response.json(account, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json(error)
    }
}

export async function PUT(request) {
    try {
        const account = await request.json()
        const updatedAccount = await repo.updateAccount(account)
        return Response.json(updatedAccount)
    } catch (error) {
        console.log(error);
        return Response.json(error)
    }
}
export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        const account = await repo.deleteAccount(id)
        return Response.json(account, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json(error)
    }
}