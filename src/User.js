import React, { createContext, useState } from "react";

export const userContext = createContext();
export const UserProvider = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    userPassword: "",
    admin: "",
    roadsIP: [],
    pipesIP: [],
    islogged: false,
  });
  const [userPassword, setUserPassword] = useState("");
  const [pipeIP, setpipeIP] = useState({
    IP: "",
    port: "",
    name: "",
  });
  const [roadIP, setroadIP] = useState({
    IP: "",
    port: "",
    name: "",
  });

  const [pipes, setPipes] = useState(false);
  const [roads, setRoads] = useState(false);
  const [clicked, setClicked] = useState("Home");

  return (
    <userContext.Provider
      value={{
        value: [user, setUser],
        roadIP: [roadIP, setroadIP],
        pipeIP: [pipeIP, setpipeIP],
        showPipes: [pipes, setPipes],
        showRoads: [roads, setRoads],
        clickedItem: [clicked, setClicked],
      }}
    >
      {" "}
      {props.children}
    </userContext.Provider>
  );
};
