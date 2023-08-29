import React, {useState} from 'react'
import './Join.css';
import Logo from "./Images/Logo.png";
import {Link} from "react-router-dom";

let user;

const sendUser=()=>{
  user=document.getElementById('joininput').value;
  document.getElementById('joininput').value="";
}

const Join = () => {
  const [name, setname] = useState("");
  
  return (

    
    <div className='joinpage'>
      <div className='joincontainer'>
        <img src={Logo} alt="" />
      <h1>Chat App</h1>
      <input onKeyPress={(e)=>e.key==='Enter'?sendUser():null}  onChange={(e)=>setname(e.target.value)} type="text" placeholder='Type your name...' id="joininput" />
      <Link onClick={(e)=>!name?e.preventDefault():null}  to="/chat"><button  onClick={sendUser} className='joinbtn'>Log In</button></Link>
      </div>
      
    </div>
  )
}

export default Join;
export {user}
