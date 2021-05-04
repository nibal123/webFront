import React, { useContext,useEffect,useState } from 'react';

import firebase from "./Firebase"
import {userContext} from "./User"

const Nav=(props)=>{
    const {value} = useContext(userContext);
    const [user,setUser]=value;
 
    const logout=function(){
        firebase.logout();
        setUser({islogged:false});

    }

console.log(props.value)
    return (<div className="nav">
        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">   <div className="logo" ></div></div>
        <div className="col-lg-4  col-md-2 col-sm-2 col-xs-2"></div> 
        {props.value==='home' ?  <div className="col">
            <div ></div><div ><a onClick={()=>{
            firebase.logout();
        }} onClick={logout} href="#/login">Logout</a></div>
        </div> :   
        <div className="row col-lg-6 col-md-8 col-sm-8 col-xs-8">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6"><a href="#/signup">Register</a></div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6"><a href="#/login">Login</a></div>
        </div> 
    }
      
      
  
   



    </div>);


}
export default Nav;