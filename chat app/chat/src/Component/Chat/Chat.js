import React, {useEffect,useState} from 'react'
import {user} from '../Join/Join';
import socketio from "socket.io-client";
import './Chat.css';
import send from '../../Component/Join/Images/send.png';
import closeicon from '../../Component/Join/Images/closeicon.png'
import Message from '../Message/Message';
import ReactScrollTOBottom from 'react-scroll-to-bottom';


let socket;
const ENDPOINT="http://localhost:4500/";

const Chat = () => {

const [id, setid] = useState("");
const [message,setmessage]=useState([]);
     const Send=()=>{
      const message=document.getElementById('chatinput').value;
       socket.emit('message',{message,id});
       document.getElementById('chatinput').value="";
     }
  
  
  useEffect(() => {
    console.log(message);
     socket=socketio(ENDPOINT, { transports:['websocket'] });

    socket.on('connect',()=>{
      alert("connected");
      setid(socket.id);

    })
    console.log(socket);
     socket.emit('joined',{user});
    

     socket.on('welcome',(e)=>{
      setmessage([...message,e]);
      console.log(e.user , e.message);
     })
     socket.on('userjoined',(e)=>{
      setmessage([...message,e]);
      console.log(e.user,e.message);
     })
     
      socket.on('leave',(e)=>{
        setmessage([...message,e]);
        console.log(e.user,e.message);
      })
  
    return () => {
      socket.emit('lostconnection');
      socket.off();

    }
  },[])

  useEffect(() => {
    socket.on('sendmessage',(e)=>{
      setmessage([...message,e]);
      console.log(e.user,e.message,e.id)
    })
  
    return () => {
      
    }
  }, [message])
  
  
  return (
    <div className='chatpage'>
      <div className="chatcontainer">
      <div className="header">
        <h1>Baat Cheet</h1>
        
        <a href="/"><img src={closeicon} alt="close" /> </a>
      </div>
      <ReactScrollTOBottom className="chatbox">
       {message.map((item,i)=><Message user={item.id===id?'':item.user} message={item.message} classs={item.id===id?'right':'left'} />)}
      </ReactScrollTOBottom>
      <div className="chatinputbox">
        <input  onKeyPress={(e)=>e.key==='Enter'?Send():null} type="text" placeholder='type here...' id="chatinput" />
        <button onClick={Send} className="sendbtn"><img src={send} alt="" /> </button>
       
      </div>

      </div>
    </div>
  )
}

export default Chat;
