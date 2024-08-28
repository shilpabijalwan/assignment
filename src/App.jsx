import { useState } from 'react'
import {app} from "./firebase"
// import { getDatabase,ref,set } from 'firebase/database'

import { RouterProvider } from 'react-router-dom'
import { router } from './router/Router'
// const db=getDatabase(app)
function App() {


  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
