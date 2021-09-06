import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import MeetingForm from "./MeetingForm";
import MeetingDisplay from "./MeetingDisplay";
import axios from "axios";
import NoteForm from "../Note/NoteForm";

const MeetingModal = (props) => {
  const {
    title,
    stylingClass,
    message,
    fromTrigger,
    meetingData,
    fetchMeeting,
    meetingID,
  } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const notAttendMeeting = () => {
    const notAttendURL = `http://localhost:5000/meeting/user/not_attend`;
    axios
      .post(notAttendURL, {
        id: parseInt(meetingID),
        email: localStorage.getItem("userEmail"),
      })
      .then(({ data }) => {
        if (data.status === 200) {
          console.log("Not attend meeting success");
          fetchMeeting();
          setShow(false);
        } else {
          alert(`Not attend meeting fail: ${data.msg}`);
        }
      })
      .catch((err) => console.log(err));
  };
  const cancelMeeting = () => {
    const deleteURL = `http://localhost:5000/meeting/user/delete_meeting`;
    axios
      .delete(deleteURL, {
        data: { id: parseInt(meetingID) },
      })
      .then(({ data }) => {
        if (data.status === 200) {
          // console.log("Cancel meeting success");
          fetchMeeting();
          setShow(false);
        } else {
          alert(`Cancel meeting fail: ${data.msg}`);
        }
      })
      .catch((err) => console.log(err));
  };
  const confirmBtnAction = () => {
    fetchMeeting();
    setShow(false);
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow} className={stylingClass}>
        {title}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {title !== "Add a Meeting" ? `${title} Meeting` : title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message ? message : ""}
          {title === "Note" ? (
            <NoteForm meetingId={meetingID} submitNoteAction={handleClose} />
          ) : (
            ""
          )}
          {fromTrigger ? (
            <MeetingForm
              data={meetingData}
              confirmBtnAction={confirmBtnAction}
            />
          ) : (
            ""
          )}
          {title === "View" ? (
            <MeetingDisplay data={meetingData} handleClose={handleClose} />
          ) : (
            ""
          )}
        </Modal.Body>
        {message ? (
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="danger"
              onClick={title === "Cancel" ? cancelMeeting : notAttendMeeting}
            >
              {title}
            </Button>
          </Modal.Footer>
        ) : (
          ""
        )}
      </Modal>
    </>
  );
};

export default MeetingModal;
