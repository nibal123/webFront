import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { userContext } from "./User";
import { useHistory } from "react-router-dom";
import firebase from "./Firebase";
import Nav from "./nav";
import Control from "./control";
import Loader from "./loader";
import sidebar from "./sidebar";
import Card from "react-bootstrap/Card";
import * as VscIcons from "react-icons/vsc";
import * as AicIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import { get } from "react-hook-form";
const Home = () => {
  const { value, clickedItem } = useContext(userContext);
  const [user, setUser] = value;
  const [Ip, setIP] = useState("");
  const [port, setPort] = useState("");
  const [address, setAddress] = useState("");
  const [src, setSrc] = useState("");
  const [command, setCommand] = useState("");
  const history = useHistory();
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(true);
  const [admin, setAdmin] = useState(user.admin);
  const [clicked, setClicked] = clickedItem;

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
  if (user.admin === false) {
    var docRef = firebase.db.collection("ip").doc("SlfW909pz3s1NcK0hJIg");
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
  const [numOfUsers, setNumOfUsers] = useState(0);
  const [numOfCams, setNumOfCams] = useState(0);
  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };
var index=1;
  const handleRtlChange = (checked) => {
    setRtl(checked);
  };
  const handleImageChange = (checked) => {
    setImage(checked);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  useEffect(() => {
    firebase.getNumberofUsers().then(function (result) {
      setNumOfUsers(result);
    });
    var sizeCam = 0;
    firebase
      .getNumberofCameras(firebase.getCurrentUserId())
      .then(function (result) {
        result.forEach((x) => {
          sizeCam += x.roadsIP.length;
          sizeCam += x.pipesIP.length;
        });
      })
      .then(() => {
        setNumOfCams(sizeCam);
      });
  });
  let variant = "Light";

  return (
    <div className="home">
      {
        timer === true || (timer === true && user.islogged === false) ? (
          <div id="loader" className="load">
            <Loader></Loader>{" "}
          </div>
        ) : user.islogged === true ? (
          <div>
            <div className="row " style={{ marginTop: "3%" }}>
              <Card
                bg={variant.toLowerCase()}
                key={1}
                style={{ width: "18rem", borderRadius: "1rem" }}
                className="mb-2 col-md-3 blue"
              >
                <Card.Body>
                  <h1>
                    <BsIcons.BsPeopleFill />

                    {" " + numOfUsers}
                  </h1>{" "}
                  <p style={{ marginLeft: "1%" }}>New Members</p>
                </Card.Body>
              </Card>
              <div className="mb-2 col-md-1"></div>
              <Card
                bg={variant.toLowerCase()}
                key={1}
                style={{ width: "18rem", borderRadius: "1rem" }}
                className="mb-2 col-md-3 green"
              >
                <Card.Body>
                  <h1>
                    <BsIcons.BsCameraVideoFill />
                    {" " + numOfCams}
                  </h1>{" "}
                  <p style={{ marginLeft: "1%" }}>Cameras added</p>
                </Card.Body>
              </Card>
              <div className="mb-2 col-md-1"></div>
              <Card
                bg={variant.toLowerCase()}
                key={1}
                style={{
                  width: "18rem",
                  cursor: "pointer",
                  borderRadius: "1rem",
                }}
                className="mb-2 col-md-3 purple"
                onClick={() => {
                  setClicked("Add Camera");
                  history.push("/addcamera");
                }}
              >
                <Card.Body>
                  {/* <h4>
                    <div className="header-card home-header">
                     
                    </div>
                    Add Camera{" "}
                  </h4>{" "} */}
                  <h1
                    style={{
                      display: "flex",
                      paddingTop: "4%",
                      paddingBottom: "0px",
                      marginBottom: "-3px",
                    }}
                  >
                    <MdIcons.MdAddCircle />
                    <p style={{ fontSize: "17px", padding: "6%" }}>
                      {" Add Camera"}
                    </p>
                  </h1>{" "}
                  <p style={{ fontSize: "13px", padding: "0px" }}>
                    Add a camera IP address to start cracks detection of pipes
                    or roads.
                  </p>
                </Card.Body>
              </Card>
              {/* <Card
                bg={variant.toLowerCase()}
                key={1}
                style={{ width: "18rem", cursor: "pointer" }}
                className="mb-2"
                onClick={() => {
                  history.push("/addcamera");
                }}
              >
                <Card.Header style={{ display: "flex" }}>
                  <div className="header-card home-header">
                    <VscIcons.VscAdd />
                  </div>
                  <h4> Add Camera</h4>
                </Card.Header>
                <Card.Body>
                  {/* <Card.Title> Add Camera </Card.Title> */}
              {/* <Card.Text>
                    Add a camera IP address to start cracks detection of pipes
                    or roads.
                  </Card.Text>
                </Card.Body>
              </Card> */}
            </div>
            <div className="row " style={{ marginTop: "3%" }}>
              <Card
                bg={variant.toLowerCase()}
                key={1}
                style={{ width: "35rem", marginLeft: "2rem" }}
                className="mb-2"
              >
                <Card.Header>
                  <div className="header-card table-header">
                    <AicIcons.AiOutlineCamera />
                    {"  Your Cameras"}
                  </div>
                </Card.Header>
                <Card.Body>
                  {/* <Card.Title> Add Camera </Card.Title> */}
                  {/* <Card.Text>
                    Add a camera IP address to start cracks detection of pipes
                    or roads.
                  </Card.Text> */}
                  
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Name</th>
                        <th>IP</th>
                        <th>Port</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.pipesIP.map((item) => {
                        // {setIndex(index+1)}
                        return (
                          <tr>
                            <th>{index++}</th>
                            <th>{item.name}</th>
                            <th>{item.IP}</th>
                            <th>{item.port}</th>
                          </tr>
                        );
                      })}
                      {user.roadsIP.map((item) => {
                        //  {setIndex(index+1)}
                        return (
                          <tr>
                            <th>{index++}</th>
                            
                            <th>{item.name}</th>
                            <th>{item.IP}</th>
                            <th>{item.port}</th>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
            </div>
          </div>
        ) : (
          ""
        )

        //    <div>

        //         <div className="row">

        //         <div className={user.admin === true ? "col-lg-7" : "user"}>     {user.admin === true ?
        //             <div className="home">
        //               <input type="text" placeholder="Please enter IP address : port" onChange={(e)=>{setAddress(e.target.value)}}/>
        //               <Button onClick={()=>{
        //                 setIP(address.split(":")[0]);
        //                 setPort(address.split(":")[1]);
        //                 setSrc(`http://${Ip}:${port}`);
        //                 setError(false);
        //                 firebase.saveIp(Ip,port);

        //               }}>Start Capturing</Button></div> : ""}
        //                 <img  onError={(ev)=>{
        //           setError(true);
        //         }} src={`http://169.254.47.150:8081/`} alt="Straming Video"></img> </div>

        //         {user.admin === true && !error ?  <img onError={(ev)=>{
        //           setError(true);
        //         }} src={src} alt="Straming Video"></img>  : ""}
        //         {user.admin === true ?
        //         <div className="col-lg-4 down">
        //  <div className=" control">
        //            <div className="triangle-up" onClick={()=>{
        //           setCommand("Up");
        //           axios.request(`http://192.168.1.89:5000/control/up?ip=${Ip}&port=${Number(port)}`);
        //         }}> <p>U</p></div>
        //            <div className="control-lr">
        //            <div className="triangle-left" onClick={()=>{
        //           setCommand("Left");
        //           axios.request(`http://192.168.1.89:5000/control/left?ip=${Ip}&port=${Number(port)}`);
        //         }}><p>L</p></div>

        //         <div className="triangle-right" onClick={()=>{
        //           setCommand("Right");
        //           axios.request(`http://192.168.1.89:5000/control/right?ip=${Ip}&port=${Number(port)}`);

        //         }}><p>R</p></div>
        //         </div>
        //         <div  className="triangle-down" onClick={()=>{
        //           setCommand("Down");
        //           axios.request(`http://192.168.1.89:5000/control/down?ip=${Ip}&port=${Number(port)}`);
        //         }}>
        //           <p>D</p>
        //         </div>
        //         </div>
        //         </div>
        //         : "" }

        //         </div>

        //         <div>

        //    </div>

        //       </div> */}
      }
    </div>
  );
};
export default Home;
