import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import NotFoundImage from "../images/404.png";

const NotFound = () => (
  <>
    <Container className="d-flex flex-column justify-content-center align-items-center main-container">
      <img src={NotFoundImage} alt="404 error" width="70%" />
      <h2 className="text-justify">Oops - Not Found!</h2>
      <p className="text-justify">
        Sorry but the page you are looking for does not exist.
      </p>
      <Button as={Link} to="/">
        Go to Home Page
      </Button>
    </Container>
  </>
);

export default NotFound;
