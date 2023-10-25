import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './App.css';
import './index.css';
import Greetings from './faidOutGreet.jsx';
import Login from './login.jsx';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";


const route = createBrowserRouter([{
  path:"/login",
  element: <Login key="egg" classname="greetings"/>,

},
{
path:"mains",
element: <App />,

},

//outside of router
//use context api


])

 ReactDOM.createRoot(document.getElementById('root')).render(

  <RouterProvider router ={route}/>
 
 );



