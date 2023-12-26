import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Outlet } from 'react-router-dom'
import {Header, Footer} from './compoents/index'
function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((Data) => { //agr error aaya toh userData naam kr dena 
      if(Data) {
        dispatch(login({Data}));
      }else{
        dispatch(logout());
      }
    })
    .finally(() => setLoading(false))
  })

  return !loading ? (
    <div className=' min-h-screen flex flex-wrap content-between bg-gray-500'>
      <div className='w-full block'>
        <Header/>
        <main>
        TODO:  <Outlet />
        </main>
        <Footer/>
      </div>
    </div>
  ): null
}

export default App
