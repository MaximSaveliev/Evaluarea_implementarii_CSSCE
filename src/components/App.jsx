
import '../styles/App.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

/* import components */
import ISO_type from './ISO_type'
import Eval_CSSCE from './Eval_CSSCE'
import ISO_275 from './ISO_275'
import Eval_CSSCE_res from './Eval_CSSCE_res'
import ISO_275_res from './ISO_275_res'
import { CheckCompanyExist } from '../helper/helper'

/* react routers */
const router = createBrowserRouter([
  {
    path : '/',
    element : <ISO_type></ISO_type>
  },
  {
    path : '/Evaluarea_implementarii_CSSCE',
    element : <CheckCompanyExist><Eval_CSSCE/></CheckCompanyExist>
  },
  {
    path : '/ISO 27005',
    element : <CheckCompanyExist><ISO_275/></CheckCompanyExist>
  },
  {
    path : '/Evaluarea_implementarii_CSSCE_result',
    element : <CheckCompanyExist><Eval_CSSCE_res/></CheckCompanyExist>
  },
  {
    path : '/ISO 27005 result',
    element : <CheckCompanyExist><ISO_275_res/></CheckCompanyExist>
  },
])

export default function App(){
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}
