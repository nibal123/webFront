import React, { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { userContext } from "./User";
const Profile = () => {
  const { value } = useContext(userContext);
  const [user, setUser] = value;

  return (
    <div className="profile">
      <Card style={{ minWidth: "40%" }}>
        <Card.Header>
          <div className="header-card">User Profile</div>
        </Card.Header>
        <Card.Body>
          {/* <Card.Title> Card Title </Card.Title> */}
          {/* <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text> */}

          <div className="form">
            <form
              className="d-flex flex-column "
              //   onSubmit={handleSubmit(onSubmit)}
              //key={props.value.id}
            >
              {/* <input
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
              /> */}
              {/* {errors.name && error("name", "")} */}
              <label for="name">Name</label>
              <input
                className={"input"}
                name="name"
                placeholder="Name"
                value={user.name}
              />
              <label for="email">Email</label>
              <input
                className={"input"}
                name="email"
                placeholder="Email"
                value={user.email}
              />
              <label for="role">Role</label>
              <input
                className={"input"}
                name="role"
                placeholder="Role"
                value={user.admin == true ? "Admin" : "Regular user"}
              />
              {/* {errors.password && error("password", "")} */}
              {/* 
              <Button variant="primary">
                Sign Up
              </Button> */}
            </form>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
