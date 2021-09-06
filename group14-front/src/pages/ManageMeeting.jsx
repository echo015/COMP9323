import React, { useEffect, useState } from "react";
import { Container, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import MeetingCard from "../components/Meeting/MeetingCard";
import MeetingModal from "../components/Meeting/MeetingModal";
import LoadingIcon from "../components/LoadingIcon";
import ErrorHandling from "../components/ErrorHandling";
import { isEmptyObj } from "../components/Helper";
import { Link } from "react-router-dom";
import axios from "axios";

const ManageMeeting = (match) => {
  const [state, setState] = useState({
    data: [],
    loading: true,
    err: "",
  });
  const query = new URLSearchParams(match.location.search);
  const scope = query.get("scope") || "all";
  const [meetingFilter, setMeetingFilter] = useState("All");
  const userEmail = localStorage.getItem("userEmail");
  const apiURL = `http://localhost:5000/meeting/user/meeting_list`;

  async function fetchMeetingData(scope) {
    try {
      const res = await axios.get(apiURL, {
        params: { email: userEmail, scope: scope },
      });
      const { data } = res;
      setState((state) => ({
        ...state,
        data: data.data,
        loading: false,
      }));
    } catch (err) {
      setState({ loading: false, err: err.response });
    }
  }

  useEffect(() => {
    fetchMeetingData(scope);
    return () => setState({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMeeting = () => {
    setState((state) => ({
      ...state,
      loading: true,
    }));
    fetchMeetingData("all");
  };

  const handleStatusChange = (e) => {
    setMeetingFilter(e.target.dataset.value);
    setState((prev) => ({
      ...prev,
      loading: true,
    }));
    fetchMeetingData(e.target.dataset.value);
  };

  return (
    <Container className="main-container">
      <Row>
        <Col>
          <h1>Manage Meeting</h1>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <DropdownButton
            id="dropdown-basic-button"
            className="meeting-filter"
            title={meetingFilter}
          >
            <Dropdown.Item
              as={Link}
              to="?scope=all"
              data-value="all"
              onClick={(e) => handleStatusChange(e)}
            >
              All
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to="?scope=upcoming"
              data-value="upcoming"
              onClick={(e) => handleStatusChange(e)}
            >
              Upcoming
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to="?scope=previous"
              data-value="previous"
              onClick={(e) => handleStatusChange(e)}
            >
              Previous
            </Dropdown.Item>
          </DropdownButton>
          <MeetingModal
            title="Add a Meeting"
            fromTrigger={true}
            fetchMeeting={fetchMeeting}
          />
        </Col>
      </Row>
      {state.loading && <LoadingIcon />}
      {!state.loading && state.err && <ErrorHandling errMsg={state.err} />}
      {!state.loading && !state.err && isEmptyObj(state.data) && (
        <p>No meeting Found!</p>
      )}
      {!state.loading &&
        !isEmptyObj(state.data) &&
        state.data.map((meetingDetail) => (
          <MeetingCard
            key={meetingDetail["id"]}
            data={meetingDetail}
            fetchMeeting={fetchMeeting}
          />
        ))}
    </Container>
  );
};

export default ManageMeeting;
