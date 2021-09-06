import React, { useEffect, useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import MeetingDisplay from "../components/Meeting/MeetingDisplay";
import NoteDisplay from "../components/Note/NoteDisplay";
import LodingIcon from "../components/LoadingIcon";
import ErrorHandling from "../components/ErrorHandling";
import { useHistory } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { FaPenSquare } from "react-icons/fa";
import axios from "axios";

const MeetingDetails = ({ match }) => {
  const [meeting, setMeeting] = useState({
    loading: true,
    data: [],
    err: "",
  });
  let history = useHistory();
  const apiURL = `http://localhost:5000/meeting/user/get_meeting`;
  const meetingId = match.params.id;
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(apiURL, {
          params: { id: meetingId },
        });
        setMeeting({ loading: false, data: res.data.meeting });
      } catch (err) {
        setMeeting({ loading: false, err: err.response });
      }
    }
    fetchData();
  }, [apiURL, meetingId]);
  if (meeting.loading) return <LodingIcon />;
  if (!meeting.loading && meeting.err)
    return <ErrorHandling errMsg={meeting.err} />;
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
        <h1 style={{ margin: "0px 0px 0px 20px" }}>Meeting Details</h1>
      </Row>
      <MeetingDisplay data={meeting.data} />
      <hr />
      <h3>
        <FaPenSquare
          size={24}
          color="#363636"
          style={{ verticalAlign: "baseline" }}
        />{" "}
        Note Section
      </h3>
      <NoteDisplay meetingId={meetingId} />
    </Container>
  );
};

export default MeetingDetails;
