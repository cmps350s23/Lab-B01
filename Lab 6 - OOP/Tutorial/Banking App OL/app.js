import {
    deposit,
    display,
    toJSON, fromJSON
} from "./bank.js";

deposit(123, 1000)
display()

const jsonData = toJSON();
console.log(jsonData);
console.log(fromJSON(jsonData));

