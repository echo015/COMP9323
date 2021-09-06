import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { isEmptyObj } from "../components/Helper";
import Calendar from "react-calendar";
import MeetingCard from "../components/Meeting/MeetingCard";
import moment from "moment";
import axios from "axios";

const Home = () => {
  const todayDate = new Date().setHours(0, 0, 0, 0);
  const [state, setState] = useState({
    data: [],
    date: new Date(todayDate),
    selectDate: "",
  });
  const userEmail = localStorage.getItem("userEmail");
  const apiURL = `http://localhost:5000/meeting/user/get_meeting_bydate`;

  useEffect(() => {
    async function fetchData(date) {
      const res = await axios.get(apiURL, {
        params: { user_id: userEmail, date: date },
      });
      const { data } = res;
      setState((state) => ({
        ...state,
        data: data.meeting,
        date: date,
        selectDate: moment(date).format("DD/MM/YYYY"),
      }));
    }
    fetchData(state.date);
  }, [apiURL, state.date, userEmail]);

  const changeDate = (value) => {
    setState((state) => ({
      ...state,
      date: value,
    }));
  };
  return (
    <Container className="main-container">
      <h1>Dashboard</h1>
      <Row>
        <Col md={8} className="dashboard-meeting-card">
          <Col>
            <h3>Meeting on {state.selectDate}</h3>
            {isEmptyObj(state.data) && (
              <p className="text-center">You don't have meeting today.</p>
            )}
            {!isEmptyObj(state.data) &&
              state.data.map((meetingDetail) => (
                <MeetingCard
                  key={meetingDetail["id"]}
                  data={meetingDetail}
                  path="dashboard"
                />
              ))}
            <p className="text-center font-weight-bold">
              <Link to="/manage-meeting">View All Meetings</Link>
            </p>
          </Col>
        </Col>
        <Col md={4}>
          <div>
            <Calendar onChange={(e) => changeDate(e)} value={state.date} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
