import React from 'react'

export type Transaction = {
  income:boolean
  amount: number,
  type: string,
  date: string
}

export default function Ledger({ ledger }: { ledger: Transaction[] }) {
  return (
    <div className='bg-white w-6/12 h-96 gap-4 self-center items-center flex-col flex overflow-scroll overflow-x-hidden mb-10'>

<table className="table table-md">

    <thead className='text-primary'>
      <tr>
        <th></th>
        <th>Amount</th>
        <th>Transaction Type</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>

    {ledger.map((item,index) => (
     
     <tr className={item.income ? "text-green-400":"text-red-400"}>
     <th>{index+1}</th>
     <td>{item.amount}</td>
     <td>{item.type}</td>
     <td>{item.date}</td>
   </tr>



    ))}

    </tbody>
  </table>

  </div>
  )
}

/*      <span className={'flex flex-row gap-4 self-center ' + (item.income === true ? "text-green-500":"text-red-500")} >
        {item.income === true ? <h1 className='text-xl'>Income:</h1>:<h1 className='text-xl'>Expense:</h1>}
        <h1 className='text-xl'>{item.amount}</h1>
        <h1 className='text-xl'>{item.type}</h1>
        <h1 className='text-xl'>{item.date}</h1>
        
        <br></br>
      </span> */