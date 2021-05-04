import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import firebase from "./Firebase";
import {userContext} from "./User"
import Nav from "./nav";


const Login = (props) => {
  const history = useHistory();
  

 const {value} = useContext(userContext);
//   const [tasks, setTasks] = value;
//   const [archived, setArchived] = value2;
  // const [userPassword, setUserPassword] = value4;
  const [userPassword, setUserPassword] = useState();
  const { register, handleSubmit, errors } = useForm();
const [user,setUser]=value;
// setUser({islogged:false});
  async function login(data) {
   
    try {
      await firebase.login(data.email, data.password).then(() => {
        setUserPassword(data.password);

        var docRef = firebase.db
          .collection("user")
          .doc(`${firebase.getCurrentUserId()}`);
        docRef
          .get()
          .then(function (doc) {
            if (doc.exists) {
              
              // setTasks(doc.data().tasks);
              // setArchived(doc.data().archived);
              setUser( {name:firebase.getCurrentUsername(),
                email:data.email,
                userPassword:data.password,
                admin:doc.data().admin ,
                islogged:true,
                pipesIP:doc.data().pipesIP,
                roadsIP:doc.data().roadsIP        });
              

              // setUser(firebase.getCurrentUsername(),data.email,data.password,doc.data());
              console.log(user);
              //console.log("adminnnnnnnnnnnn"+doc.data());
              console.log("helloooo");  
            } else {
              console.log("doesnt exist");
              setUser( {name:firebase.getCurrentUsername(),
                email:data.email,
                userPassword:data.password,
                admin:false,
                islogged:true ,
                pipesIP:doc.data().pipesIP,
                roadsIP:doc.data().roadsIP        });
          firebase.setUserDataBase(firebase.getCurrentUserId(),firebase.getCurrentUsername(),false,"",0);


            }
          })
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
      });


      history.push("./home");
    } catch (error) {
      alert(error.message);
    }
  }
  const onSubmit = (data, e) => {
    console.log(data);
    login(data);
  };
  const error = (type, message) => {
    return (
      <p className="error">
        *
        {errors[type].type === "required"
          ? "Required"
          : errors[type].type === "minLength"
          ? `${type} is too short`
          : errors[type].type === "validate"
          ? `Invalid Email`
          : ""}
      </p>
    );
  };
  function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  return (

    
    <div  >
    <div>
    <Nav value={"login"}></Nav></div>
<div className="dark-background">
    <div className="login ">
    
      <div className="row">
        <div className="col-lg-7 col-md-7  col-sm-9">
          { <h1/* style={{"-webkit-text-stroke": "1px black",
    "-webkit-text-fill-color":" white"}}*/>
    Login</h1> }
          <div className="form">
            <form
              className="d-flex flex-column "
              onSubmit={handleSubmit(onSubmit)}
            >
              
              <input
                ref={register({
                  required: true,
                  minLength: 2,
                  validate: (input) => validateEmail(input),
                })}
                className={errors.email ? "has-error" : "input"}
                placeholder="Email"
                name="email"
              />
              {errors.email && error("email", "")}

              <input
                type="password"
                ref={register({ required: true, minLength: 5 })}
                className={errors.password ? "has-error" : "input"}
                name="password"
                placeholder="Password"
              />
    
            
              {errors.password && error("password", "")}
              <Button type="submit" variant="primary">
                Login
              </Button>
              <a href="#/signup">Create New Account</a>
              {error}
            </form>
          </div>
        </div>
        
      </div>
    </div></div>
    </div>
  );
};

export default Login;