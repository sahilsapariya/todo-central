import React, {useState, useEffect} from 'react'
import Navbar from './Navbar.jsx'
import { useLocation } from 'react-router-dom'

function Todo(props) {
  const [data, setUsedata] = useState(props.userdata)
  
  const location = useLocation();
  return (
    <>
        <Navbar />
        <div>Todo</div>
        {/* {location} */}
        {location.state["Login"]}
        <br />
        
    </>
  )
}

export default Todo