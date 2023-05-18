import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from './Modal';
import QR_redirect from './QR_redirect';

import vulnerabilities from '../database/vulnerabilities'

export default function ISO_275() {

  const [tp, setTp] = useState('');
  const [vl, setVl] = useState('');
  const [sev, setSev] = useState('');
  const [det, setDet] = useState('');


  const [risks, setRisks] = useState([]);
  const [rowsData, setRowsData] = useState([]);

  const initialRowData = {
    tp: null,
    vl: null,
    sev: null,
    det: null
  };

  function onRestart() {
    dispatch(resetAllAction())
    dispatch(resetResultAction())
    setRowsData([]);
  }

  const calculateRisk = (index, newTp, newVl, newSev, newDet) => {
    if (newTp !== null && newVl !== null && newSev !== null && newDet !== null) {
      const risk = (newTp + newVl + newSev) * newDet * 100 / 27;
      console.log(`Calculated risk for index ${index}: ${risk}`);
      const updatedRowsData = [...rowsData];
      updatedRowsData[index] = {
        ...updatedRowsData[index],
        tp: newTp,
        vl: newVl,
        sev: newSev,
        det: newDet,
        risk: risk
      };
      setRowsData(updatedRowsData);
    }
  };



  return (
    <>
      <div className='w-[75%] mx-auto'>
        <h1 className='text-3xl text-center my-7 text-gray-900 dark:text-gray-300'>ISO 27005 Checklist</h1>
        <div id='vulnerabilityTable' className='relative overflow-x-auto scrollbar-thumb-blue-500 scrollbar-track-gray-300'>
          <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">

              <div className='inline-block'>Abbreviations:
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">TP - Threat Probability (what is likelihood of the incident)</p>
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">VL - Vulnerability Level (how easy to exploit)</p>
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">SEV - Severity/Business impact</p>
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">DET - Detect Ability</p>
              </div>
              <div className='inline-block align-top pl-6'>Indicators
                <div className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400"><div className='w-3 h-3 inline-block rounded-full bg-green-500 mr-2'></div>{`Risk < 20%`}</div>
                <div className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400"><div className='w-3 h-3 inline-block rounded-full bg-orange-500 mr-2'></div>{`Risk > 21%`}</div>
                <div className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400"><div className='w-3 h-3 inline-block rounded-full bg-red-500 mr-2'></div>{`Risk > 41%`}</div>
              </div>
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="pl-6 py-3 max-w-[75px]">Risk ID</th>
                <th scope="col" className="px-3 py-3">Vulnerability</th>
                <th scope="col" className="px-3 py-3">Description</th>
                <th scope="col" className="px-3 py-3">TP</th>
                <th scope="col" className="px-3 py-3">VL</th>
                <th scope="col" className="px-3 py-3">SEV</th>
                <th scope="col" className="px-3 py-3">DET</th>
                <th scope="col" className="px-3 py-3">Risk</th>
                <th scope="col" className="px-3 pr-6 py-3">Advice</th>
              </tr>
            </thead>
            <tbody>
              {vulnerabilities.map((vulnerability, index) => {
                const rowDataKey = `row-${index + 1}`;
                const rowData = rowsData[index] || initialRowData;
                return (
                  <tr key={vulnerability.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td scope="row" className="px-3 pl-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{vulnerability.id}</td>
                    <td className="px-3 py-4 w-[225px]">{vulnerability.vulnerability}</td>
                    <td className="px-3 py-4 w-[350px]">{vulnerability.description}</td>
                    <td className="px-3 py-4 min-w-[100px]">
                      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={rowData.tp || ''}
                        onChange={(e) => {
                          const newTp = parseInt(e.target.value);
                          const updatedRowData = {
                            ...rowData,
                            tp: newTp
                          };
                          const updatedRowsData = [...rowsData];
                          updatedRowsData[index] = updatedRowData;
                          setRowsData(updatedRowsData);
                          calculateRisk(index, newTp, rowData.vl, rowData.sev, rowData.det);
                        }}
                      >
                        <option>Choose TP</option>
                        <option value="1">Low</option>
                        <option value="2">Medium</option>
                        <option value="3">High</option>
                      </select>
                    </td>
                    <td className="px-3 py-4 min-w-[100px]">
                      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={rowData.vl || ''}
                        onChange={(e) => {
                          const newVl = parseInt(e.target.value);
                          const updatedRowData = {
                            ...rowData,
                            vl: newVl
                          };
                          const updatedRowsData = [...rowsData];
                          updatedRowsData[index] = updatedRowData;
                          setRowsData(updatedRowsData);
                          calculateRisk(index, rowData.tp, newVl, rowData.sev, rowData.det);
                        }}
                      >
                        <option>Choose VL</option>
                        <option value="1">Hard</option>
                        <option value="2">Medium</option>
                        <option value="3">Easy</option>
                      </select>
                    </td>
                    <td className="px-3 py-4 min-w-[100px]">
                      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={rowData.sev || ''}
                        onChange={(e) => {
                          const newSev = parseInt(e.target.value);
                          const updatedRowData = {
                            ...rowData,
                            sev: newSev
                          };
                          const updatedRowsData = [...rowsData];
                          updatedRowsData[index] = updatedRowData;
                          setRowsData(updatedRowsData);
                          calculateRisk(index, rowData.tp, rowData.vl, newSev, rowData.det);
                        }}
                      >
                        <option>Choose a SEV</option>
                        <option value="1">Low</option>
                        <option value="2">Medium</option>
                        <option value="3">High</option>
                      </select>
                    </td>
                    <td className="px-3 py-4  min-w-[100px]">
                      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={rowData.det || ''}
                        onChange={(e) => {
                          const newDet = parseInt(e.target.value);
                          const updatedRowData = {
                            ...rowData,
                            det: newDet
                          };
                          const updatedRowsData = [...rowsData];
                          updatedRowsData[index] = updatedRowData;
                          setRowsData(updatedRowsData);
                          calculateRisk(index, rowData.tp, rowData.vl, rowData.sev, newDet);
                        }}
                      >
                        <option>Choose a DET</option>
                        <option value="3">Low</option>
                        <option value="2">Medium</option>
                        <option value="1">High</option>
                      </select>
                    </td>
                    <td className="py-4 max-w-[52px]">
                      <div
                        className={
                          `w-3 h-3 text-xs flex justify-center items-center m-auto rounded-full` +
                          (rowData.risk <= 20 ? ' bg-green-500' : '') +
                          (20 < rowData.risk && rowData.risk <= 40 ? ' bg-orange-500' : '') +
                          (rowData.risk > 40 ? ' bg-red-500' : '') +
                          (isNaN(rowData.risk) ? ' bg-white' : '')
                        }
                      >
                        {/*{rowData.risk ? parseFloat(rowData.risk).toFixed(2) + ' %' : ''}*/}
                      </div>
                    </td>
                    <td className="px-3 pr-6 py-4 min-w-[100px]">
                      <Modal adviceList={vulnerability.advice} prompt={vulnerability.prompt} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className='flex justify-center my-7'>
          <Link className='w-80 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800' to={'/'} onClick={onRestart}>Reattempt to the checklist </Link>
        </div>
        <QR_redirect />
      </div>
    </>
  )
}
