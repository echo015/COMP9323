import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import TaskForm from "./TaskForm";
import TaskDisplay from "./TaskDisplay";

const TaskModal = (props) => {
  const {
    title,
    stylingClass,
    message,
    fromTrigger,
    taskData,
    fetchTask,
    showN,
    noteId,
  } = props;
  const [show, setShow] = useState(showN);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const confirmBtnAction = () => {
    setShow(false);
    fetchTask();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className={stylingClass}>
        {title}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {title !== "Add a Task" ? `${title} Task` : title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message ? message : ""}
          {fromTrigger ? (
            <TaskForm
              data={taskData}
              fetchTask={fetchTask}
              confirmBtnAction={confirmBtnAction}
              noteId={noteId}
            />
          ) : (
            ""
          )}
          {title === "View" ? <TaskDisplay data={taskData} /> : ""}
        </Modal.Body>
        {message ? (
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Confirm
            </Button>
          </Modal.Footer>
        ) : (
          ""
        )}
      </Modal>
    </>
  );
};

export default TaskModal;
