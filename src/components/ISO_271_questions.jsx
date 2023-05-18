import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/* Custom hook */
import { useFetchQuestion } from '../hooks/fetchQuestion'
import { updateResult } from '../hooks/setResult'
import QR_redirect from './QR_redirect'

export default function ISO_271_questions({ onChecked }) {

    const [checked, setChecked] = useState(undefined)
    const { trace } = useSelector(state => state.questions)
    const result = useSelector(state => state.result.result)
    const [{ isLoading, apiData, serverError }] = useFetchQuestion()
    const { queue } = useSelector(state => state.questions)

    const questions = useSelector(state => state.questions.queue[state.questions.trace])
    const dispatch = useDispatch()

    useEffect(() => {
        //console.log({ trace, checked })
        dispatch(updateResult({ trace, checked }))
    }, [checked])

    function onSelect(i) {
        onChecked(i)
        setChecked(i)
        dispatch(updateResult({ trace, checked }))
    }

    //function onSelect_YES() {
    //    console.log("YES")
    //}
    //
    //function onSelect_NO() {
    //    console.log("NO")
    //}

    if (isLoading) return <h3>Is Loading</h3>
    if (serverError) return <h3>{serverError || "Unknown error"}</h3>

    return (
        <>
            <div className=''>
                <h1 className='text-center mt-2 font-medium text-lg text-gray-900 dark:text-gray-300'>ISO 27001 - {questions?.section} section</h1>
                <p className='font-semibold text-gray-500 mt-5'>{trace + 1} / {queue.length}</p>
                <h2 className='mt-2'>{questions?.question}</h2>
                <ul key={questions?.id} className='grid w-full gap-6 md:grid-cols-2 mt-7'>
                    {
                        questions?.options.map((q, i) => (
                            <li key={i} className=''>
                                <input className='absolute invisible peer'
                                    type="radio"
                                    value={false}
                                    name='options'
                                    id={`q${i}-option`}
                                    onChange={() => onSelect(i)} />
                                <label htmlFor={`q${i}-option`} className={`inline-flex items-center justify-between w-full p-5 border rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 ${result[trace] == i ? 'border-blue-600 text-blue-600 bg-white' : 'text-gray-500 bg-white border-gray-200 hover:text-gray-600 hover:bg-gray-100'}`}>
                                    <div className={`flex w-full text-lg font-semibold justify-center`}>{q}</div>
                                </label>
                            </li>
                        ))
                    }
                </ul>
                {/*<div className='grid grid-flow-col'>
                    <button onClick={onSelect_YES} className='bg-green-500 rounded'>Yes</button>
                    <button onClick={onSelect_NO} className='bg-red-500 rounded'>No</button>
                </div>*/}
            </div>
            <QR_redirect/>
        </>
    )
}
