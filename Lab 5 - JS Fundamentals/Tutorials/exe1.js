// npm i prompt-sync
import promptSync from "prompt-sync";
const prompt = promptSync();

const name = prompt("What is your name");
console.log("Your name is", name);

//CTRL + C to stop the terminal
