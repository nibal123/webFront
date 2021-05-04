import React, { useState, useContext } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import SidebarData from "./sidebarData";
import "./sidebar.css";
import { IconContext } from "react-icons";
import { userContext } from "./User";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import * as GiIcons from "react-icons/gi";
import * as IoIcons from "react-icons/io";
import Firebase from "./Firebase";
import { useHistory } from "react-router-dom";
function Sidebar() {
  const {
    value,
    roadIP,
    pipeIP,
    showPipes,
    showRoads,
    clickedItem,
  } = useContext(userContext);
  const [user, setUser] = value;
  const [pipesIP, setpipeIP] = pipeIP;
  const [roadsIP, setroadIP] = roadIP;
  const [sidebar, setSidebar] = useState(true);
  const history = useHistory();

  const [roads, setRoads] = showRoads;
  const [clicked, setClicked] = clickedItem;
  const [pipes, setPipes] = showPipes;
  const showSidebar = () => setSidebar(!sidebar);
  const showPipesFun = () => setPipes(!pipes);
  const showRoadsFun = () => setRoads(!roads);
  return (
    <>
      {user.islogged == true ? (
        <IconContext.Provider value={{ color: "#fff" }}>
          {/* <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div> */}
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul
              className="nav-menu-items"
              //   onClick={showSidebar}
            >
              {/* <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li> */}
              {/* <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">   <div className="logo" ></div></div> */}
              {SidebarData.map((item, index) => {
                if (item.title === "Underground Pipes") {
                  var x = (
                    <div>
                      {" "}
                      <li
                        key={index}
                        className="sidebar-item"
                        onClick={showPipesFun}
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </li>
                      {pipes === true && user.pipesIP.length != 0 ? (
                        user.pipesIP.map((pipe, ind) => {
                          //   if(ind === user.pipesIP.length-1)
                          //   {
                          //       return (
                          //        <> <li key={index+ind} className={item.cName}  IP={pipe.IP} port={pipe.port}>
                          //         <Link to={item.path}>
                          //         {item.icon}
                          //           <span IP={pipe.IP} port={pipe.port} onClick={(e)=>{
                          //         setpipeIP({IP:e.target.getAttribute("IP"),
                          //         port:  e.target.getAttribute("port")});
                          //         console.log(pipesIP)

                          //     }
                          //     } >Camera #{ind+1}</span>
                          //         </Link>
                          //       </li>
                          //        <li key={index+'add'} className="sidebar-item" onClick={()=>{
                          //         console.log("dddddd")
                          //     }}>
                          //     <IoIcons.IoMdAddCircle/>
                          //     <span >Add Camera</span>

                          //     </li></>

                          //       )
                          //   }
                          //   else
                          return (
                            <li
                              key={index + ind}
                              className={item.cName}
                              IP={pipe.IP}
                              port={pipe.port}
                              namee={pipe.name}
                              onClick={() => setClicked("pipe" + index + ind)}
                              style={
                                clicked == "pipe" + index + ind
                                  ? { background: "#5692a4" }
                                  : { background: "none" }
                              }
                            >
                              <Link to={item.path}>
                                {item.icon}
                                <span
                                  IP={pipe.IP}
                                  port={pipe.port}
                                  namee={pipe.name}
                                  onClick={(e) => {
                                    setpipeIP({
                                      IP: e.target.getAttribute("IP"),
                                      port: e.target.getAttribute("port"),
                                      name: e.target.getAttribute("namee"),
                                    });
                                    console.log(pipesIP);
                                  }}
                                >
                                  Camera #{ind + 1}
                                </span>
                              </Link>
                            </li>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                  return x;
                } else if (item.title === "Roads") {
                  var x = (
                    <div>
                      {" "}
                      <li
                        key={index}
                        className="sidebar-item"
                        onClick={showRoadsFun}
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </li>
                      {roads == true && user.roadsIP.length != 0 ? (
                        user.roadsIP.map((road, ind) => {
                          return (
                            <li
                              key={index + ind}
                              className={item.cName}
                              onClick={() => setClicked("road" + index + ind)}
                              style={
                                clicked == "road" + index + ind
                                  ? { background: "#5692a4" }
                                  : { background: "none" }
                              }
                            >
                              <Link to={item.path}>
                                {item.icon}

                                <span
                                  IP={road.IP}
                                  port={road.port}
                                  name={road.name}
                                  onClick={(e) => {
                                    setroadIP({
                                      IP: e.target.getAttribute("IP"),
                                      port: e.target.getAttribute("port"),
                                      name: e.target.getAttribute("name"),
                                    });
                                    console.log(roadsIP);
                                  }}
                                >
                                  Road Cam #{ind + 1}
                                </span>
                              </Link>
                            </li>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                  return x;
                } else if (item.title == "Log Out") {
                  return (
                    <li key={index} className={item.cName}>
                      <Link
                        to={item.path}
                        onClick={() => {
                          Firebase.logout();
                          setUser({ islogged: false });
                          history.push("/");
                          setClicked("Home");
                          setPipes(false);
                          setRoads(false);
                        }}
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                } else {
                  return (
                    <li
                      key={index}
                      className={item.cName}
                      onClick={() => {
                        setClicked(item.title);
                      }}
                      style={
                        clicked === item.title
                          ? { background: "#5692a4" }
                          : { background: "none" }
                      }
                    >
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Sidebar;
