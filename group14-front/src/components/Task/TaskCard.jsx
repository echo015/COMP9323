import React from "react";
import { Card, Row, Button } from "react-bootstrap";
import TaskModal from "./TaskModal";
import axios from "axios";
import moment from "moment";

const TaskCard = ({ data, fetchTask }) => {
  const {
    Task_ID,
    Task_title,
    Description,
    EndTime,
    Creator_email,
    Task_status,
  } = data;
  const role = localStorage.getItem("userRole");
  const desc = Description.split("\n")
    .join(" ")
    .split(" ")
    .slice(0, 20)
    .join(" ");
  const displayTime = moment(EndTime).format("DD/MM/YYYY h:mm A");
  function Start() {
    const postURL = `http://localhost:5000/task/user/modify_task`;
    axios
      .post(postURL, { Task_ID: Task_ID, Task_status: 1 })
      .then(({ data }) => {
        if (data.status === 200) {
          fetchTask();
        } else {
          // setErrMsg(data.msg);
          // setShow(true);
        }
      })
      .catch((err) => console.log(err));
  }
  function Finish() {
    const postURL = `http://localhost:5000/task/user/modify_task`;
    axios
      .post(postURL, { Task_ID: Task_ID, Task_status: 2 })
      .then(({ data }) => {
        if (data.status === 200) {
          fetchTask();
        } else {
          // setErrMsg(data.msg);
          // setShow(true);
        }
      })
      .catch((err) => console.log(err));
  }
  function Delete() {
    const postURL = `http://localhost:5000/task/user/delete_task`;
    axios
      .delete(postURL, {params: { Task_ID: Task_ID }})
      .then(({ data }) => {
        if (data.status === 200) {
          fetchTask();
        } else {
          // setErrMsg(data.msg);
          // setShow(true);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <Card
      className="task-detail-card"
      style={{ marginTop: "0", padding: "5px" }}
    >
      <Card.Body>
        <Row>
          <h4>{Task_title}</h4>
        </Row>
        <Row>
          <p>{desc}...</p>
        </Row>
        <Row>
          <label
            htmlFor="EndTime"
            className="form-label"
            style={{ marginRight: "5px" }}
          >
            <strong>Deadline: </strong>
          </label>
          <p className="task-detail-date">{displayTime}</p>
        </Row>
        <Row>
          <label
            htmlFor="Creator_email"
            className="form-label"
            style={{ marginRight: "5px" }}
          >
            <strong>Creator: </strong>
          </label>
          <p className="Creator_email">{Creator_email}</p>
        </Row>
        <Row>
          <TaskModal
            title="View"
            taskData={data}
            stylingClass="tasking-card-btn"
            fetchTask={fetchTask}
          />
          <div style={{ marginRight: "5px" }}></div>
          {Task_status !== 2 && role === "mentor" && (
            <>
              <TaskModal
                title="Edit"
                fromTrigger={true}
                taskData={data}
                fetchTask={fetchTask}
              />
              <Button
                variant="danger"
                style={{ marginLeft: "5px" }}
                onClick={Delete}
              >
                Delete
              </Button>
            </>
          )}
          {Task_status === 0 && role === "mentor" && (
            <>
              <Button
                variant="info"
                style={{ marginLeft: "5px" }}
                onClick={Start}
              >
                Start
              </Button>
            </>
          )}
          {Task_status === 1 && (
            <>
              <Button
                variant="success"
                style={{ marginLeft: "10px" }}
                onClick={Finish}
              >
                Finish
              </Button>
            </>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
