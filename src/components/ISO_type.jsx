import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUserId } from '../redux/result_reducer'
import QR_redirect from './QR_redirect'
/*import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompany } from '@fortawesome/free-solid-svg-icons'*/

export default function ISO_type() {
  const inputRef = useRef(null)
  const dispatch = useDispatch()
  
  function startISO_27001(){
    if(inputRef.current?.value){
      dispatch(setUserId(inputRef.current?.value))
    }
  }

  function startISO_27005(){
    if(inputRef.current?.value){
      dispatch(setUserId(inputRef.current?.value))
    }
  }

  return (
    <div className="">
      <h1 className="text-3xl font-medium text-center mt-7">ISO CyberSecurity Certification</h1>
      <form id="form" className='flex items-center justify-center my-7'>
        <input ref={inputRef} type="text" name="" id="" className="w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-5 p-2.5 sm:w-[45%] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Company Name' />
      </form>
      <div className='flex flex-col items-center md:justify-evenly md:flex-row '>
        <Link className='w-80 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800' to={'ISO 27001'} onClick={startISO_27001}>ISO 27001</Link>
        <Link className='w-80 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 md:m-0 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800' to={'ISO 27005'} onClick={startISO_27005}>ISO 27005</Link>
      </div>
      <QR_redirect/>
    </div>
  )
}
