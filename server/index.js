import express from "express"
import cors from "cors"
import sqlite3 from 'sqlite3'
import path from "path"

const dbserver = express()
const webserver = express()


//DB routines
const db = new sqlite3.Database(':memory:')
db.run("CREATE TABLE Transactions ('income' BOOLEAN,'amount' INTEGER,'type' TEXT, 'date' TEXT)")

const writeTransaction = (json) => {

const wrapStr = (str)=>("'" + str + "'")

db.serialize(()=>{
    let queryString = "INSERT INTO Transactions VALUES ("
    queryString += (json.income + "," + json.amount + "," + wrapStr(json.type) + "," + wrapStr(json.date) + ")") 
    console.log(queryString)
    db.run(queryString,(res) =>{console.log(res)})
    
})


}

//Configuring dbserver

dbserver.use(cors())
dbserver.use(express.json());

dbserver.post('/write', (req, res) => {
    const data = req.body; // Access the JSON data from the request body
    console.log(data); // Log the data to the console

    writeTransaction(data);

    res.json({ message: "Done Write" });


});

//Read Transactions
dbserver.post("/read", (req, res) => {

    const respArr = []

    db.each("SELECT rowid AS id, * FROM Transactions", (err, row) => {

        let Transaction = {
            type: row.type,
            income: (row.income === 1 ? true:false),
            amount: row.amount,
            date: row.date
        }
        if (err) {
            console.log(err)
        }
       
        respArr[row.id-1] = Transaction
    
      //respArr.push(row.id + ": " + row.type + row.income + row.date + row.amount)
      console.log(respArr)
      
    },()=>{
        res.json(respArr);
    });

    
   
})

//configuring webserver
webserver.use(express.static(path.resolve() + "/build"));

console.log(path.resolve() + "/build")
webserver.get('*', (req, res) => {
    res.sendFile(path.resolve() +"/build/index.html");
  });
  


dbserver.listen(8000, () => console.log('Server listening on port 8000'));

  webserver.listen(80, () => {
    console.log("Server started on port 80" );
  });


