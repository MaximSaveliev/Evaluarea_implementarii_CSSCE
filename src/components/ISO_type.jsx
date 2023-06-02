import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUserId } from '../redux/result_reducer'
import QR_redirect from './QR_redirect'
/*import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompany } from '@fortawesome/free-solid-svg-icons'*/

export let inputDataValue = '';

export default function ISO_type() {
  const [inputData, setInputData] = useState('');
  const inputRef = useRef(null)
  const dispatch = useDispatch()
  
  function start_EVAL_CSSCE(){
    if(inputRef.current?.value){
      dispatch(setUserId(inputRef.current?.value))
      inputDataValue = inputRef.current?.value; // Assign the value to the export variable
      console.log(inputData)
    }
  }

  function startISO_27005(){
    if(inputRef.current?.value){
      dispatch(setUserId(inputRef.current?.value))
    }
  }

  return (
    <div className="">
      <h1 className="text-3xl font-medium text-center mt-7">Evaluarea implementării CSSCE</h1>
      <form id="form" className='flex items-center justify-center my-7'>
        <input ref={inputRef} type="text" value={inputData} onChange={(e) => setInputData(e.target.value)} name="" id="" className="w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-5 p-2.5 sm:w-[45%] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Instituția' />
      </form>
      <div className='flex flex-col items-center md:justify-evenly md:flex-row '>
        <Link className='w-80 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800' to={'Evaluarea_implementarii_CSSCE'} onClick={start_EVAL_CSSCE}>Evaluarea CSSCE</Link>
      </div>
      <QR_redirect/>
    </div>
  )
}
