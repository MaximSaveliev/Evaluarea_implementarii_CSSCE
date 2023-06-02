import React, { useEffect, useState } from 'react'
import Questions from './Eval_CSSCE_questions'
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/fetchQuestion'
import { PushAnswer } from '../hooks/setResult'

/* redux store import */
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function Eval_CSSCE() {

  const [check, setChecked] = useState(undefined)
  const result = useSelector(state => state.result.result)
  const { queue, trace } = useSelector(state => state.questions)
  const dispatch = useDispatch()

  useEffect(() => {
    //console.log(result)
  })

  /* Next button event handler */
  function onNext() {
    //console.log('On Next')
    if (trace < queue.length) {
      /* update the trace value by one using MoveNextQuestion */
      dispatch(MoveNextQuestion())

      /* Insert a new result in the array */
      if (result.length <= trace) {
        dispatch(PushAnswer(check))
      }
    }

    /* reset the value of the checked variable */
    setChecked(undefined)
  }

  /* Prev button event handler */
  function onPrev() {
    console.log('On Prev')
    if (trace > 0) {
      /* update the trace value by one using MovePrevQuestion */
      dispatch(MovePrevQuestion())
    }
  }

  function onChecked(check) {
    console.log(check)
    setChecked(check)
  }

  /* Finish ISO27001 checklist*/
  if (result.length && result.length >= queue.length) {
    return <Navigate to={'/Evaluarea_implementarii_CSSCE_result'} replace={true}></Navigate>
  }

  return (
    <>
      <div className='mx-[10%] md:mx-[5%] lg:mx-[15%] 2xl:mx-[25%]'>
        <h1 className='text-center mt-7 font-medium text-lg text-gray-900 dark:text-gray-300'>Evaluarea implementării CSSCE</h1>

        {/* Display questions */}
        <Questions onChecked={onChecked} />

        <div className='grid w-full grid-flow-col mt-7 gap-6'>
          { trace > 0 ? <button className='w-full md:w-[150px] md:mx-0 h-10 mx-auto text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800' onClick={onPrev}>Prev</button> : <div className='w-full md:w-[150px]'></div>}
          
          <button className=' w-full md:w-[150px] md:mx-0 md:justify-self-end h-10 mx-auto text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800' onClick={onNext}>Next</button>
        </div>
      </div>
    </>
  )
}
