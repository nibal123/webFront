import React, {useState } from 'react';
import axios from 'axios'

const Control=()=>{
    const [command,setCommand]=useState("");
    const [Ip,setIP]=useState("");
    const [port,setPort]=useState("");
    return(
        <div className="control">
        <div className="triangle-up" onClick={()=>{
       setCommand("Up");
       axios.request(`http://192.168.1.89:5000/control/up?ip=${Ip}&port=${Number(port)+1}`);
     }}> <p>U</p></div>
        <div className="control-lr">
        <div className="triangle-left" onClick={()=>{
       setCommand("Left");
       axios.request(`http://192.168.1.89:5000/control/left?ip=${Ip}&port=${Number(port)+1}`);
     }}><p>L</p></div>

     <div className="triangle-right" onClick={()=>{
       setCommand("Right");
       axios.request(`http://192.168.1.89:5000/control/right?ip=${Ip}&port=${Number(port)+1}`);
          
     }}><p>R</p></div>
     </div>
     <div  className="triangle-down" onClick={()=>{
       setCommand("Down");
       axios.request(`http://192.168.1.89:5000/control/down?ip=${Ip}&port=${Number(port)+1}`);
     }}>
       <p>D</p>
     </div>
     </div>
    );
}




export default Control;