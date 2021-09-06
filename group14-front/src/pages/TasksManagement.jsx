import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TaskModal from "../components/Task/TaskModal";
import TaskCard from "../components/Task/TaskCard";
// import { tasksCompleted, tasksInProgress,tasksNotYetData } from "../demoData.js";
import axios from "axios";

const TasksManagement = (match) => {
  const role = localStorage.getItem("userRole");
  const [state, setState] = useState({
    loading: true,
    notyetData: [],
    inprogressData: [],
    completeData: [],
  });
  const query = new URLSearchParams(match.location.search);
  const noteId = query.get("noteId");
  let show_N = noteId !== null;

  async function LoadTaskList(params) {
    const getURL = `http://localhost:5000/task/user/task_list`;
    axios
      .get(getURL, { params })
      .then(({ data }) => {
        if (data.status === 200) {
          let notyetList = [];
          let inprogressList = [];
          let completeList = [];
          for (let i = 0; i < data["My_Task_list"].length; i++) {
            if (data["My_Task_list"][i]["Task_status"] === 0) {
              notyetList.push(data["My_Task_list"][i]);
            } else if (data["My_Task_list"][i]["Task_status"] === 1) {
              inprogressList.push(data["My_Task_list"][i]);
            } else if (data["My_Task_list"][i]["Task_status"] === 2) {
              completeList.push(data["My_Task_list"][i]);
            }
          }
          setState((state) => ({
            ...state,
            notyetData: notyetList,
            inprogressData: inprogressList,
            completeData: completeList,
            loading: false,
          }));
        }
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchTask();
    return () => setState({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchTask = () => {
    setState((state) => ({
      ...state,
      loading: true,
    }));
    LoadTaskList({ email: localStorage.getItem("email") });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Manage Task</h1>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          {role === "mentor" && (
            <TaskModal
              title="Add a Task"
              fromTrigger={true}
              showN={show_N}
              fetchTask={fetchTask}
              noteId={noteId}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col className="task-mgt-col" xs={12} md={4}>
          <h3 style={{ marginBottom: "0" }}>Not Yet Start</h3>
          {state.notyetData.map((notyetDetail) => (
            <TaskCard
              key={notyetDetail["Task_ID"]}
              data={notyetDetail}
              fetchTask={fetchTask}
            />
          ))}
        </Col>
        <Col className="task-mgt-col" xs={12} md={4}>
          <h3 style={{ marginBottom: "0", backgroundColor: "green" }}>
            In Progress
          </h3>
          {state.inprogressData.map((inprogressDetail) => (
            <TaskCard
              key={inprogressDetail["Task_ID"]}
              data={inprogressDetail}
              fetchTask={fetchTask}
            />
          ))}
        </Col>
        <Col className="task-mgt-col" xs={12} md={4}>
          <h3 style={{ marginBottom: "0", backgroundColor: "gray" }}>
            Complete
          </h3>
          {state.completeData.map((completeDataDetail) => (
            <TaskCard
              key={completeDataDetail["Task_ID"]}
              data={completeDataDetail}
              fetchTask={fetchTask}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default TasksManagement;
