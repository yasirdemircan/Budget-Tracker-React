
import React, { useEffect, useState } from 'react';
import './App.css';
import Ledger, { Transaction } from './components/Ledger';
import InputForm from './components/InputForm';
import SendWrite from './lib/SendWrite';

function App() {
  const [tType, setTtype] = useState<string>("Other");
  const [amount, setAmount] = useState<number>(0);
  const inputref = React.useRef<HTMLInputElement>(null)
  const [total, setTotal] = useState<number>(0)

  const [ledger, setLedger] = useState<Transaction[]>([])

  const inputClear = () => {
    if (inputref.current) {
      inputref.current.value = ""
      setAmount(0)
    }
  }

  const addIncome = () => {

    if (amount !== 0) {
      SendWrite({ income: true, amount: amount, type: tType, date: (new Date()).toDateString()}).then(() => {
        setLedger([...ledger, { income: true, amount: amount, type: tType, date: (new Date()).toDateString() }])
        setTotal(total + amount)
        inputClear()
      }, () => {
        alert("Error Writing Request")
      })


    } else {
      alert("Please enter amount")
    }



  }

  const addExpense = () => {

    if (amount !== 0) {
      SendWrite({ income: false, amount: amount, type: tType, date: (new Date()).toDateString()}).then(() => {
        setLedger([...ledger, { income: false, amount: amount, type: tType, date: (new Date()).toDateString() }])
        setTotal(total - amount)

        inputClear()
      }, () => {
        alert("Error Writing Request")
      })


    } else {
      alert("Please enter amount and type")
    }



  }

  //Getting saved transactions
  useEffect(() => {

    const getFromDB = async () => {
      const res = await fetch("http://localhost:8000/read", { method: "POST" })
      const json = await res.json()

      let total = 0
      for (let object of json) {



        if (object.income === true) {
          total += object.amount
        } else {
          total -= object.amount
        }
      }
      setTotal(total)
      setLedger(json)
      console.log(json)
    }

    getFromDB()


  }, [])

  return (

    <div className="bg-gradient-to-r from-[#654ea3] to-[#eaafc8] w-full  flex items-center justify-center">
      <div className=' mx-72 mt-24 mb-48 h-full w-full bg-base-100 bg-opacity-20 flex flex-col gap-24 rounded-2xl'>

        <h1 className='text-center text-neutral mt-10 text-2xl mx-[40%]'>{"Total Value: " + total}$</h1>

        <InputForm A_setter={setAmount} T_setter={setTtype} inputRef={inputref}></InputForm>


        <div className='flex flex-row w-72 self-center justify-between '>
          <button className="btn btn-success btn-md" onClick={() => {
            addIncome()
          }}>Income</button>
          <button className="btn btn-warning btn-md" onClick={() => {
            addExpense()
          }}>Expense</button>
        </div>

<Ledger ledger={ledger} ></Ledger>

        
      </div>

    </div>
  );
}

export default App;
