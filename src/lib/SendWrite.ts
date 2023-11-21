import type { Transaction } from "../components/Ledger";

//Function to write a transaction to database
export default async function SendWrite (transaction:Transaction) {

const res = await fetch("http://localhost:8000/write",{
    headers:{
       "Content-Type": "application/json"
    },
    method:"POST",
    body: JSON.stringify(transaction)
})

const response = await res.text();
console.log(response)
}
