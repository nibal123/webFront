import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import { userContext } from "./User";
import { useHistory } from "react-router-dom";
import firebase from "./Firebase";
import Nav from "./nav";
import Control from "./control";
import Loader from "./loader";
import sidebar from "./sidebar";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "react-bootstrap/Card";
import * as FiIcons from "react-icons/fi";
import * as MdIcons from "react-icons/md";

toast.configure();

const Pipe = () => {
  const {
    value,
    roadIP,
    pipeIP,
    showPipes,
    showRoads,
    clickedItem,
  } = useContext(userContext);

  
  const [roads, setRoads] = showRoads;
  const [clicked, setClicked] = clickedItem;
  const [pipes, setPipes] = showPipes;
  const [user, setUser] = value;
  // const [pipesIP,setpipeIP]=useState(pipeIP);
  const [Ip, setIP] = pipeIP;
  console.log(Ip);
  // const [Ip,setIP]=useState("");
  // const [port,setPort]=useState("");
  const [address, setAddress] = useState("");
  const [src, setSrc] = useState("");
  const [command, setCommand] = useState("");
  const history = useHistory();
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(true);
  const [admin, setAdmin] = useState(user.admin);
  const [show, setShow] = useState(false);
  const [showD, setShowD] = useState(false);
  const [date, setDate] = useState("");

  const [imageIndex, setImageIndex] = useState(0);

  const handleCloseD = () => setShowD(false);
  const handleShowD = () => setShowD(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (!firebase.getCurrentUsername()) {
    alert("Please login first");
    history.push("/login");
  }
  useEffect(() => {

    const interval = setInterval(() => {
      var x=imageIndex+1;
      setImageIndex(x);
      if(imageIndex%2==0)
      setSrc("http://176.119.254.185:7004/frames/output/image.jpg");
      else
      setSrc("http://176.119.254.185:7004/frames/output/image0.jpg");
      var date=new Date().getTime().toString().slice(0,10);
      setDate(date);
     
      setError(false);
      console.log(src);
    }, 100);
    return () => clearInterval(interval);
   
  },);

//   function update() {
//     setSrc("")
//     var source = 'http://192.168.1.53/html/cam.jpg',
//         timestamp = (new Date()).getTime(),
//         newUrl = source + '?_=' + timestamp;
//     document.getElementById("img").src = newUrl;
//     document.getElementById("img1").src =  newUrl;
//     setTimeout(update, 1000);
// }

  // if (user.admin === false) {
  //   var docRef = firebase.db.collection("ip").doc("SlfW909pz3s1NcK0hJIg");
  //   docRef
  //     .get()
  //     .then(function (doc) {
  //       if (doc.exists) {
  //         setSrc(`http://${doc.data().ip}:${doc.data().port}`);
  //         console.log(src);
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log("Error getting document:", error);
  //     });
  // }

  setTimeout(() => {
    setTimer(false);
  }, 2000);

  console.log(Ip);
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
  const deleteCam = (e) => {
    const userr = user;
    var index = -1;
    for (var i = 0; i < user.pipesIP.length; i++) {
      if (user.pipesIP[i].IP == Ip.IP && user.pipesIP[i].port == Ip.port)
        index = i;
    }
    if (index > -1) {
      userr.pipesIP.splice(index, 1);
    }
    setUser(userr);
    firebase.saveCamera("pipes", user, firebase.getCurrentUserId());
    handleCloseD();
    history.push("/home");
    setClicked("Home");
    setPipes(false);
    setRoads(false);
  };

  return (
    <div className="pipe-home">
      {timer === true ? (
        <div id="loader" className="load">
          <Loader></Loader>{" "}
        </div>
      ) : (
        <div>
          <div className="cam-container">
            <Dropdown>
              <Dropdown.Toggle
                className="settings"
                id="dropdown-basic"
                bsPrefix="p-2"
              >
                <FiIcons.FiSettings />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleShow}>
                  Show Cam's Info
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ color: "salmon" }}
                  onClick={handleShowD}
                >
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="row">
            <div className="col-md-2"></div>
            <div
              className={
                user.admin === true ? "col-md-6 video" : "col-md-9 video"
              }
            >
             
              {user.admin === false && !error &&date ? (
                <img
                  onError={(ev) => {
                    setError(true);
                  }}
                  key={date}
                  id={date}
                  src={src}
                  alt="Straming Video"
                ></img>
              ) : (
                <>
                  <Loader></Loader>
                  <div>
                    <p>Waiting for camera to start streaming </p>
                  </div>
                </>
              )}
            </div>

            {user.admin === true ? (
              <div className="col-lg-3 down">
                <div className=" control">
                  <span
                    class="dot"
                    onClick={() => {
                      setCommand("Up");
                      axios.request(
                        `http://192.168.1.89:5000/control/up?ip=${
                          Ip.IP
                        }&port=${Number(Ip.port)}`
                      );
                    }}
                  >
                    <MdIcons.MdKeyboardArrowUp />
                  </span>
                  <div className="control-lr">
                    <span
                      class="dot"
                      onClick={() => {
                        setCommand("Left");
                        axios.request(
                          `http://192.168.1.89:5000/control/left?ip=${
                            Ip.IP
                          }&port=${Number(Ip.port)}`
                        );
                      }}
                    >
                      <MdIcons.MdKeyboardArrowLeft />
                    </span>

                    <span
                      class="dot"
                      onClick={() => {
                        setCommand("Right");
                        axios.request(
                          `http://192.168.1.89:5000/control/right?ip=${
                            Ip.IP
                          }&port=${Number(Ip.port)}`
                        );
                      }}
                    >
                      <MdIcons.MdKeyboardArrowRight />
                    </span>
                  </div>

                  <span
                    class="dot"
                    onClick={() => {
                      setCommand("Down");
                      axios.request(
                        `http://192.168.1.89:5000/control/down?ip=${
                          Ip.IP
                        }&port=${Number(Ip.port)}`
                      );
                    }}
                  >
                    <MdIcons.MdKeyboardArrowDown />
                  </span>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div></div>
        </div>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Card style={{ minWidth: "40%" }}>
            <Card.Header>
              <div className="header-card gray">Camera's Info</div>
            </Card.Header>
            <Card.Body>
              <div className="form">
                <form className="d-flex flex-column ">
                  <label for="name">Name</label>
                  <input
                    className={"input"}
                    name="name"
                    placeholder="Name"
                    value={Ip.name}
                  />
                  <label for="IP">IP</label>
                  <input
                    className={"input"}
                    name="IP"
                    placeholder="IP"
                    value={Ip.IP}
                  />
                  <label for="port">Port</label>
                  <input
                    className={"input"}
                    name="port"
                    placeholder="Port"
                    value={Ip.port}
                  />
                </form>
              </div>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showD} onHide={handleCloseD}>
        <Modal.Body>Are you sure you want to delete this cam?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={deleteCam}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleCloseD}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Pipe;
