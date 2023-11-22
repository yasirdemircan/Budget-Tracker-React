import React, { useState } from 'react'
import type { Transaction } from './Ledger'

type inputProps = {
    T_setter: React.Dispatch<React.SetStateAction<string>>,
    A_setter: React.Dispatch<React.SetStateAction<number>>,
    inputRef: React.RefObject<HTMLInputElement>
}

const categories = ["Bank","Rent","Utility","Transfer","Other"]
export default function InputForm({ A_setter, T_setter, inputRef }: inputProps) {



    const amountInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

        A_setter(parseInt(e.target.value))
    }
    const transInputHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {

        const dropdown = document.querySelector('#dropdown')
        const dropdownName = document.querySelector("#dropdownName")
        console.log(dropdown)
        dropdown?.removeAttribute("open")

        if (dropdownName) {
            dropdownName.innerHTML = e.currentTarget.innerHTML
        }

        T_setter(e.currentTarget.innerHTML)
    }
    return (
        <div className='flex flex-col justify-center self-center gap-4 '>
            <input className='input-primary input-md w-48 sm:w-52 self-center ' type='text' ref={inputRef} placeholder='Amount' onChange={(e) => {
                amountInputHandler(e)
            }} />

            <details id='dropdown' className="dropdown self-center">
                <summary className="m-1 btn btn-primary w-48 sm:w-52" id='dropdownName'>Transaction Type</summary>
                <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-48 sm:w-52">
                    {
                        categories.map((category,index)=>(
                            <li key={index}><a onClick={(e) => { transInputHandler(e) }}>{category}</a></li>
                        ))
                    }
                 
                </ul>
            </details>


        </div>
    )
}
