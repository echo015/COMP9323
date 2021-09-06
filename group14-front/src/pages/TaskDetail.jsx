import React, { useEffect, useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import TaskDisplay from "../components/Task/TaskDisplay";
import LodingIcon from "../components/LoadingIcon";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { FaChevronLeft } from "react-icons/fa";

const TaskDetails = ({ match }) => {
  const [task, setTask] = useState({
    loading: true,
    data: [],
  });
  let history = useHistory();
  const apiURL = `http://localhost:5000/task/user/get_task`;
  const taskId = match.params.Task_ID;
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(apiURL, {
        params: { "Task_ID": taskId },
      });
      setTask({ loading: false, data: res.data.data });
    }
    fetchData();
  }, [apiURL, taskId]);
  if (task.loading) return <LodingIcon />;
  return (
    <Container className="main-container">
      <Row
        className="d-flex align-items-center"
        style={{ marginBottom: "20px" }}
      >
        <Button
          style={{ borderRadius: "50%", padding: "10px" }}
          className="back-btn btn-circle"
          onClick={() => history.goBack()}
        >
          <FaChevronLeft size={18} />
        </Button>
        <h1 style={{ margin: "0px 0px 0px 20px" }}>Task Details</h1>
      </Row>
      <TaskDisplay data={task.data} />
      <hr />
    </Container>
  );
};

export default TaskDetails;
