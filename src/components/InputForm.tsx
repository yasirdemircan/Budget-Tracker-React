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

        const dropdown = document.querySelector('[class="dropdown"]')
        const dropdownName = document.querySelector("#dropdownName")
        dropdown?.removeAttribute("open")

        if (dropdownName) {
            dropdownName.innerHTML = e.currentTarget.innerHTML
        }

        T_setter(e.currentTarget.innerHTML)
    }
    return (
        <div className='flex flex-col justify-center w-52 self-center gap-4 '>
            <input className='input-primary input-md ' type='text' ref={inputRef} placeholder='Amount' onChange={(e) => {
                amountInputHandler(e)
            }} />

            <details className="dropdown">
                <summary className="m-1 btn btn-primary w-52" id='dropdownName'>Transaction Type</summary>
                <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    {
                        categories.map((category)=>(
                            <li><a onClick={(e) => { transInputHandler(e) }}>{category}</a></li>
                        ))
                    }
                 
                </ul>
            </details>


        </div>
    )
}
