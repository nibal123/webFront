import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import firebase from "./Firebase";
import { userContext } from "./User";
import Nav from "./nav";
import Card from "react-bootstrap/Card";

function AddCamera(props) {
  const {
    value,
    roadIP,
    pipeIP,
    showPipes,
    showRoads,
    clickedItem,
  } = useContext(userContext);
  const history = useHistory();
  const [roads, setRoads] = showRoads;
  const [clicked, setClicked] = clickedItem;
  const [pipes, setPipes] = showPipes;
  const [user, setUser] = value;
  const [pipesIP, setpipesIP] = pipeIP;
  const [roadsIp, setRoadsIP] = roadIP;
  const { register, handleSubmit, errors } = useForm();

  const [checked, setChecked] = useState();

  const onSubmit = (data, e) => {
    console.log(data);
    if (checked === "roads") {
      const userr = user;
      userr.roadsIP = [
        ...user.roadsIP,
        { IP: data.IP, port: data.port, name: data.name },
      ];
      setUser(userr);
    } else {
      const userr = user;
      userr.pipesIP = [
        ...user.pipesIP,
        { IP: data.IP, port: data.port, name: data.name },
      ];
      setUser(userr);
    }

    console.log(user);

    firebase.saveCamera(checked, user, firebase.getCurrentUserId()).then(() => {
      setClicked("Home");
      setRoads(false);
      setPipes(false);
      history.push("/home");
    });
  };
  const error = (type, message) => {
    return (
      <p className="error2">
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

  return (
    <div className="add-camera">
      <Card style={{ minWidth: "40%" }}>
        <Card.Header>
          <div className="header-card terq">Add New Camera</div>
        </Card.Header>
        <Card.Body>
          <div className="form">
            <form
              className="d-flex flex-column "
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                ref={register({
                  required: true,
                  minLength: 1,
                })}
                className={errors.name ? "has-error" : "input"}
                placeholder="Name"
                name="name"
              />
              {errors.name && error("name", "")}

              <input
                ref={register({
                  required: true,
                  minLength: 2,
                  //   validate: (input) => validateEmail(input),
                })}
                className={errors.IP ? "has-error" : "input"}
                placeholder="IP"
                name="IP"
              />
              {errors.IP && error("IP", "")}

              <input
                type="number"
                ref={register({ required: true, minLength: 2 })}
                className={errors.port ? "has-error" : "input"}
                name="port"
                placeholder="Port"
              />

              {errors.port && error("port", "")}
              <div style={{ alignSelf: "baseline" }}>
                <p>Camera used for</p>
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="pipes"
                      checked={checked === "pipes" ? true : false}
                      onChange={() => setChecked("pipes")}
                    />
                    Pipes
                  </label>{" "}
                </div>

                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="roads"
                      checked={checked === "roads" ? true : false}
                      onChange={() => setChecked("roads")}
                    />
                    Roads
                  </label>
                </div>
              </div>

              <Button type="submit" className="add-cam-button">
                Add
              </Button>

              {error}
            </form>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddCamera;
