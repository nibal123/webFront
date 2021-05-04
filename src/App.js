import "./App.css";
import Home from "./Home";
import React, { useEffect, useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider } from "./User";
import firebase from "./Firebase";
import Sidebar from "./sidebar";
import Road from "./road";
import Pipe from "./pipe";
import AddCamera from "./addCamera";
import profile from "./Profile";
function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Switch>
            <Route exact path="/" exact component={Login}></Route>
            <Route path="/signup" exact component={SignUp}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route path="/home" exact component={Home}></Route>
            <Route path="/roads" exact component={Road}></Route>
            <Route path="/undergroundpipes" exact component={Pipe}></Route>
            <Route path="/addcamera" exact component={AddCamera}></Route>
            <Route path="/profile" exact component={profile}></Route>
          </Switch>
          <Sidebar>
            <Switch>
              <Route path="/home" exact component={Home}></Route>
              <Route path="/roads" exact component={Road}></Route>
              <Route path="/undergroundpipes" exact component={Pipe}></Route>
              <Route path="/addcamera" exact component={AddCamera}></Route>
              <Route path="/profile" exact component={profile}></Route>
            </Switch>
          </Sidebar>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
