import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Home from './pages/Home'
import AllPost from './pages/AllPost'
import AddPost from './pages/AddPost'
import EditPost from './pages/EditPost'
import Signup from './pages/Signup.jsx'
import Post from "./pages/Post";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login.jsx'
import { Protected } from './compoents/AuthLayout.jsx'
import ForgotPassword from './compoents/ForgotPassword.jsx'
import ResetPassword from './compoents/ResetPassword.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/Login',
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        ),
      },
      {
        path: '/signup',
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        ),
      },
      {
        path: '/all-posts', //it can be all-post
        element: (
          <Protected authentication={true}>
            {""}
            <AllPost />
          </Protected>
        ),
      },
      {
        path: '/add-post', //it can be add-post
        element: (
          <Protected authentication={true}>
            <AddPost />
          </Protected>
        ),
      },
      {
        path: '/edit-post/:slug', 
        element: (
          <Protected authentication={true}>
            <EditPost />
          </Protected>
        ),
      },
      {
        path: '/post/:slug',
        element: <Post />
      },
      {
        path:'/forgotPassword',
        element: <ForgotPassword />
      },
      {
        path: '/resetPassword',
        element: <ResetPassword />,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render( 
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
)
