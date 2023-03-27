export async function GET(request, { params }) {
    const { id } = params
    return new Response(`the dynamic route account No = ${id}`)
}
// const person = {
//     name: 'John',
//     age: 30
// }

// const name = person.name
// const age = person.age
// const {name  , age } = person