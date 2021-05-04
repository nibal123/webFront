import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import firebase from "./Firebase";
import { useHistory } from "react-router-dom";
import {userContext} from "./User"
import Nav from './nav';
import 'bootstrap/dist/css/bootstrap.css';
const SignUp = () => {
  const { register, handleSubmit, errors } = useForm();
  const {value}=useContext(userContext);
  const [user,setUser]=value;
  const history = useHistory();
  async function onRegister(data) {
    try {
     if(firebase.register(data.name, data.email, data.password)!==-1){
setUser({name:data.name,
email:data.email,
password:data.password});


      console.log("idddddd", firebase.getCurrentUserId());
      history.push("/Home");
     }
else{
alert("This user with this email already exits");
console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");}
    } catch (error) {
      alert(error.message);
    }
  }

  // firebase.auth.onAuthStateChanged((firebaseUser) => {
  //   if (firebaseUser) console.log(firebaseUser);
  //   else console.log("not logged in");
  // });

  const onSubmit = (data, e) => {
    onRegister(data);
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
    <div>
      <Nav value={"signup"}></Nav>
      <div className="dark-background">
    <div className="login">
      <div className="row">
        <div className="col-lg-7 col-md-7  col-sm-9">
          <h1>Sign Up</h1>
          <div className="form">
            <form
              className="d-flex flex-column "
              onSubmit={handleSubmit(onSubmit)}
              //key={props.value.id}
            >
              <input
                ref={register({
                  required: true,
                  minLength: 2,
                  validate: (input) => validateEmail(input),
                })}
                className={errors.email ? "has-error" : "input"}
                name="email"
                placeholder="Email"
              />
              {errors.email && error("email", "")}

              <input
                ref={register({ required: true, minLength: 2 })}
                className={errors.name ? "has-error" : "input"}
                name="name"
                placeholder="Name"
              />
              {errors.name && error("name", "")}

              <input
                type="password"
                ref={register({ required: true, minLength: 5 })}
                className={errors.password ? "has-error" : "input"}
                name="password"
                placeholder="Password"
              />
              {errors.password && error("password", "")}

              <Button type="submit" variant="primary" >
                Sign Up
              </Button>
            </form>
            <a href="#/login">Already have an account?</a>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};
export default SignUp;