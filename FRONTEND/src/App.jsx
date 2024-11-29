import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/shared/Navbar'

import Login from './components/auth/login'
import Signup from './components/auth/signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetUp from './components/admin/CompanySetUp'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'


const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/description/:id',
    element:<JobDescription/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  }
  ,
  //admin keliye yaha se start hoga 
  {
    path:'/admin/companies',
    element:<ProtectedRoute>     <Companies/> </ProtectedRoute>
  },
  {
    path:'/admin/companies/create',
    element: <ProtectedRoute>  <CompanyCreate/>  </ProtectedRoute> 
  },
  {
    path:'/admin/companies/:id',
    element: <ProtectedRoute>   <CompanySetUp/>  </ProtectedRoute> 
  },
  {
    path:'/admin/jobs',
    element:<ProtectedRoute>   <AdminJobs/>   </ProtectedRoute> 
  },
  {
    path:'/admin/jobs/create',
    element: <ProtectedRoute>    <PostJob/> </ProtectedRoute> 
  },
  {
    path:'/admin/jobs/:id/applicants',
    element:<ProtectedRoute> <Applicants/>    </ProtectedRoute> 
  }
 
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <Navbar/> */}
    <RouterProvider router = {appRouter}/>
    </>
  )
}

export default App
