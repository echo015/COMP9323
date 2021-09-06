import React, { useState, useEffect } from "react";
import { Container, Alert, Row, Col } from "react-bootstrap";
import Avatar from "react-avatar";
import Background from "../images/profile_bg.jpg";
import ErrorHandling from "../components/ErrorHandling";
import { useForm } from "react-hook-form";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({
    data: [],
    loading: true,
    userRole: localStorage.getItem("userRole"),
    userId: localStorage.getItem("userId"),
    err: "",
  });
  const apiURL = `http://localhost:5000/user/${user.userId}`;
  const { email } = !user.err && user.data;
  const [successMsg, setSuccessMSg] = useState("");
  const [show, setShow] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur", // "onChange"
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(apiURL);
        const { data } = res;
        setUser((user) => ({
          ...user,
          loading: false,
          data: data.data[0],
        }));
      } catch (err) {
        setUser({ loading: false, err: err.response });
      }
    }
    fetchData();
  }, [apiURL]);

  function putUserPorfileAPI(param) {
    axios
      .put(apiURL, param)
      .then(({ data }) => {
        if (data.status === 201) {
          setUser((user) => ({
            ...user,
            data: {
              firstName: param.firstName,
              lastName: param.lastName,
            },
          }));
        }
      })
      .catch((err) => console.log(err));
    setSuccessMSg("Updated Profile.");
    setShow(true);
  }

  function onSubmit(data, e) {
    e.preventDefault();
    putUserPorfileAPI(data);
  }
  if (!user.loading && user.err) return <ErrorHandling errMsg={user.err} />;
  return (
    <>
      {user.loading && ""}
      {!user.loading && !user.err && (
        <Container className="main-container">
          <Row>
            <Col>
              <h1>
                <span className="user-profile-role">{user.userRole}</span>{" "}
                Profile
              </h1>
            </Col>
          </Row>
          <Row className="bg-light">
            <Col
              md={7}
              style={{ backgroundImage: `url(${Background})` }}
              className="user-profile-bg"
            ></Col>
            <Col
              md={5}
              className="d-flex flex-column align-items-center user-profile"
            >
              <Avatar
                name={`${user.data.firstName} ${user.data.lastName}`}
                size="150"
                textSizeRatio={0.75}
                round="50%"
              />
              <p className="user-profile-email">{email}</p>
              <form className="user-profile" onSubmit={handleSubmit(onSubmit)}>
                <Alert
                  variant="success"
                  show={show}
                  onClose={() => setShow(false)}
                  dismissible
                >
                  {successMsg}
                </Alert>
                <div className="mb-3 form-group">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    className="form-control"
                    defaultValue={user.data.firstName}
                    {...register("firstName", { required: true })}
                  />
                  {errors.firstName && (
                    <p className="error-msg">First name cannot be empty.</p>
                  )}
                </div>
                <div className="mb-3 form-group">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    className="form-control"
                    defaultValue={user.data.lastName}
                    {...register("lastName", { required: true })}
                  />
                  {errors.lastName && (
                    <p className="error-msg">Last name cannot be empty.</p>
                  )}
                </div>
                <div className="mb-3 form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="********"
                    autoComplete="on"
                    {...register("password", {
                      required: "You must specify a password",
                      minLength: {
                        value: 8,
                        message: "Password must have at least 8 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="error-msg">{errors.password.message}</p>
                  )}
                </div>
                <input
                  type="submit"
                  className="btn-block btn btn-primary"
                  value="Submit"
                />
              </form>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Profile;
