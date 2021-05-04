import React, { useContext, useState } from 'react';
import axios from 'axios'
import {Button} from "react-bootstrap"
import {userContext} from "./User"
import { useHistory } from "react-router-dom";
import firebase from "./Firebase";
import Nav from "./nav";
import Control from './control';
import Loader from './loader';
import sidebar from './sidebar';
const Road=()=>{
    const {value,roadIP,pipeIP} = useContext(userContext);
    const [user,setUser]=value;
    const [pipesIP,setpipeIP]=pipeIP;
   const [Ip,setIP]=roadIP;

    // const [Ip,setIP]=useState("");
    // const [port,setPort]=useState("");
    const [address,setAddress]=useState("");
    const [src,setSrc]=useState("");
    const [command,setCommand]=useState("");
    const history = useHistory();
  const [error,setError]=useState(false);
  const [timer,setTimer]=useState(true);
  const [admin,setAdmin]=useState(user.admin);

  if (!firebase.getCurrentUsername()) {
    alert("Please login first");
    history.push("/login");
  }
// if(user.admin === true){
//   var docRef = firebase.db
//           .collection("ip")
//           .doc("SlfW909pz3s1NcK0hJIg");
//         docRef
//           .get()
//           .then(function (doc) {
//             if (doc.exists) {
//   setSrc(`http://${doc.ip}:${doc.port}`);  
// }}
// }
if(user.admin === false){
var docRef = firebase.db
        .collection("ip")
        .doc("SlfW909pz3s1NcK0hJIg");
      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            setSrc(`http://${doc.data().ip}:${doc.data().port}`);  
            console.log(src);
         
         
          } 
           
          
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
      }

  setTimeout(() => {
    setTimer(false);
    }, 2000);
    
console.log(user);
const [rtl, setRtl] = useState(false);
const [collapsed, setCollapsed] = useState(false);
const [image, setImage] = useState(true);
const [toggled, setToggled] = useState(false);

const handleCollapsedChange = (checked) => {
  setCollapsed(checked);
};

const handleRtlChange = (checked) => {
  setRtl(checked);
 
};
const handleImageChange = (checked) => {
  setImage(checked);
};

const handleToggleSidebar = (value) => {
  setToggled(value);
};

    return (
    <div className="home">


{timer === true ?    
       <div id="loader" className="load">
  <Loader></Loader> </div>  : <div>
      <Nav value={"home"}></Nav>
    
        <div className="row">
         
        <div className={user.admin === true ? "col-lg-7" : "user"}>     {user.admin === true ?  
            <div className="home">
              <input type="text" placeholder="Please enter IP address : port" onChange={(e)=>{setAddress(e.target.value)}}/>
              <Button onClick={()=>{
                setIP({IP:address.split(":")[0], port:address.split(":")[1]});
                // (address.split(":")[1]);
                setSrc(`http://${Ip.IP}:${Ip.port}`);      
                setError(false);
                // firebase.saveIp(Ip,port);
              
              }}>Start Capturing</Button></div> : ""}
                <img  onError={(ev)=>{
          setError(true);
        }} src={`http://169.254.47.150:8081/`} alt="Straming Video"></img> </div>
           
        {user.admin === true && !error ?  <img onError={(ev)=>{
          setError(true);
        }} src={src} alt="Straming Video"></img>  : ""}
        {user.admin === true ?  
        <div className="col-lg-4 down">
 <div className=" control">
           <div className="triangle-up" onClick={()=>{
          setCommand("Up");
          axios.request(`http://192.168.1.89:5000/control/up?ip=${Ip.IP}&port=${Number(Ip.port)}`);
        }}> <p>U</p></div>
           <div className="control-lr">
           <div className="triangle-left" onClick={()=>{
          setCommand("Left");
          axios.request(`http://192.168.1.89:5000/control/left?ip=${Ip.IP}&port=${Number(Ip.port)}`);
        }}><p>L</p></div>

        <div className="triangle-right" onClick={()=>{
          setCommand("Right");
          axios.request(`http://192.168.1.89:5000/control/right?ip=${Ip.IP}&port=${Number(Ip.port)}`);
             
        }}><p>R</p></div>
        </div>
        <div  className="triangle-down" onClick={()=>{
          setCommand("Down");
          axios.request(`http://192.168.1.89:5000/control/down?ip=${Ip.IP}&port=${Number(Ip.port)}`);
        }}>
          <p>D</p>
        </div>
        </div>
        </div>
        : "" }
        
        </div>
       
        <div>

     
   </div>  
   
      </div>
      }

      </div>
    );

};
export default Road;