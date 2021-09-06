import React, { useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
const Login = () => {
  const [errMsg, setErrMsg] = useState("");
  const [show, setShow] = useState(false);
  // const [isStudent, setIsStudent] = useState(true);

  function loginAPI(params) {
    const postURL = `http://localhost:5000/login/user`;
    axios
      .post(postURL, params)
      .then(({ data }) => {
        if (data.status === 200) {
          localStorage.setItem("userRole", data.data[0].role);
          localStorage.setItem("userId", data.data[0].id);
          localStorage.setItem("userEmail", data.data[0].email);
          localStorage.setItem("email", data.data[0].email);
          window.location.href = "/";
        } else {
          setErrMsg(data.msg);
          setShow(true);
        }
      })
      .catch((err) => console.log(err));
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur", // "onChange"
  });
  const onSubmit = (data, e) => {
    e.preventDefault();
    loginAPI(data);
  };

  return (
    <>
      <Container className="login-page">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
              <Alert
                variant="danger"
                show={show}
                onClose={() => setShow(false)}
                dismissible
              >
                {errMsg}
              </Alert>
              <div className="mb-3 form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  autoComplete="on"
                  {...register("email", {
                    validate: {
                      isEmpty: (value) => value !== "",
                      emailPattern: (value) => /^\S+@\S+$/i.test(value),
                    },
                  })}
                />
                {errors.email && errors.email.type === "isEmpty" && (
                  <p className="error-msg">This is required</p>
                )}
                {errors.email && errors.email.type === "emailPattern" && (
                  <p className="error-msg">
                    Please enter correct email format.
                  </p>
                )}
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
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
                value="Login"
              />
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
