
import '../styles/App.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

/* import components */
import ISO_type from './ISO_type'
import ISO_271 from './ISO_271'
import ISO_275 from './ISO_275'
import ISO_271_res from './ISO_271_res'
import ISO_275_res from './ISO_275_res'
import AdviceModal from './adviceModal'
import { CheckCompanyExist } from '../helper/helper'

/* react routers */
const router = createBrowserRouter([
  {
    path : '/',
    element : <ISO_type></ISO_type>
  },
  {
    path : '/ISO 27001',
    element : <CheckCompanyExist><ISO_271/></CheckCompanyExist>
  },
  {
    path : '/ISO 27005',
    element : <CheckCompanyExist><ISO_275/></CheckCompanyExist>
  },
  {
    path : '/ISO 27001 result',
    element : <CheckCompanyExist><ISO_271_res/></CheckCompanyExist>
  },
  {
    path : '/ISO 27005 result',
    element : <CheckCompanyExist><ISO_275_res/></CheckCompanyExist>
  },
  {
    path : '/chat',
    element : <AdviceModal></AdviceModal>
  },
])

export default function App(){
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}
