import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ResultTable271 from './resultTable271'
import { useDispatch, useSelector } from 'react-redux'
import { attempts_Number, earnPoints_Number, flagResult, earnPoints_Percent } from '../helper/helper'
import QR_redirect from './QR_redirect'
import { inputDataValue } from './ISO_type'

/* Import Action */
import { resetAllAction } from '../redux/question_reducer'
import { resetResultAction } from '../redux/result_reducer'

/* Chart result */
import Chart from "./chart"

export default function Eval_CSSCE_res() {

  const dispatch = useDispatch()
  const { questions: { queue, answers }, result: { result, userId } } = useSelector(state => state)

  useEffect(() => {
    console.log(flag)
  })

  const totalPoints = queue.length /* Possible earn points */
  const attempts = attempts_Number(result) /* Number of attempted questions */
  const earnPoints = earnPoints_Number(result, answers, 1) /* Number of earned points */
  const flag = flagResult(totalPoints, earnPoints) /* Check if Company passed the the ISO 27001 checklist */
  const percent = earnPoints_Percent(totalPoints, earnPoints) /* Percent of earned points */

  function onRestart() {
    dispatch(resetAllAction())
    dispatch(resetResultAction())
  }
  return (
    <>
      <div className='mx-[10%] md:mx-[15%] lg:mx-[15%] 2xl:mx-[25%]'>
        <h1 className='text-3xl text-center my-7 text-gray-900 dark:text-gray-300'>Evaluarea implementarii CSSCE raport</h1>
        <div className='grid w-full'>
          <div className='flex w-full justify-between py-[6px] px-3 border-b-[1px] hover:bg-slate-100/50'>
            <span className='font-medium text-gray-900 dark:text-gray-300'>Instituția</span>
            <span className='text-gray-900 dark:text-gray-300'>{inputDataValue}</span>
          </div>
          <div className='flex w-full justify-between py-[6px] px-3 border-b-[1px] hover:bg-slate-100/50'>
            <span className='font-medium text-gray-900 dark:text-gray-300'>Nr. Indicatori Implementați</span>
            <span className='text-gray-900 dark:text-gray-300'>{earnPoints || 0}</span>
          </div>
          <div className='flex w-full justify-between py-[6px] px-3 border-b-[1px] hover:bg-slate-100/50'>
            <span className='font-medium text-gray-900 dark:text-gray-300'>Nr. Indicatori ce trebuie implementați</span>
            <span className='text-gray-900 dark:text-gray-300'>{totalPoints - earnPoints || 0}</span>
          </div>
          <div className='flex flex-col sm:flex-row w-full justify-between py-[6px] px-3 font-medium border-b-[1px] hover:bg-slate-100/50'>
            <span className='text-gray-900 dark:text-gray-300'>Nivelul de implementare a CSSCE</span>
            <span className={`${flag ? 'text-green-500' : 'text-red-500'}`}>Instituția DVS a implementat {percent === "100.000" ? "100" : percent} %</span>
          </div>
        </div>

        <div className='flex justify-center mt-7'>
          <Chart />
        </div>

        <div className='flex justify-center mt-7'>
          <Link className='w-80 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800' to={'/'} onClick={onRestart}>Actualizați răspunsul Dvs</Link>
        </div>

        <QR_redirect/>
        {/*<div className="container mt-7">
          <ResultTable271 />
          </div>
        */}
      </div>
    </>
  )
}
