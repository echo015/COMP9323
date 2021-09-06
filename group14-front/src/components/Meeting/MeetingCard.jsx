import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import MeetingModal from "./MeetingModal";
import { Link } from "react-router-dom";
import moment from "moment";

const MeetingCard = ({ data, fetchMeeting, path }) => {
  const userRole = localStorage.getItem("userRole");
  const isStudent = userRole === "student" ? true : false;
  const {
    topic: title,
    agenda,
    start_time: date,
    duration,
    recording_url: recordingURL,
    join_url: joinURL,
    notattend: notAttend,
  } = data;
  const startTime = moment(date).format("h:mm A");
  const startDate = moment(date).format("DD/MM/YYYY");
  const endTime = moment(date).add(duration, "minutes").format("h:mm A");
  const endDate = moment(date).add(duration, "minutes").toISOString();
  const todayDate = new Date();
  const meetingComplete = endDate < todayDate.toISOString() ? true : false;
  const meetingHasStarted = date < todayDate.toISOString() ? true : false;
  const descAgenda = agenda.split(" ").slice(0, 20).join(" ");

  return (
    <Card className="meeting-detail-card">
      <Card.Body>
        <Row>
          <Col md={path ? 3 : 2}>
            <p className="meeting-detail-date">{startDate}</p>
            <p className="meeting-detail-time">
              {startTime} - {endTime}
            </p>
          </Col>
          <Col md={path ? 9 : 6}>
            <h3 className="meeting-title">
              <Link to={`manage-meeting/${data.id}`}>{title}</Link>
            </h3>
            <p>{descAgenda}...</p>
          </Col>
          <Col className="d-flex justify-content-end align-items-end">
            <MeetingModal
              title="Note"
              meetingData={data}
              stylingClass="meeting-card-btn"
              meetingID={data.id}
            />
            {!meetingComplete && !isStudent && (
              <Link
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary meeting-card-btn"
                to={{ pathname: joinURL }}
              >
                Start
              </Link>
            )}
            {!meetingHasStarted && !isStudent && (
              <>
                <MeetingModal
                  title="Reschedule"
                  fromTrigger={true}
                  meetingData={data}
                  stylingClass="meeting-card-btn"
                  fetchMeeting={fetchMeeting}
                />
                <MeetingModal
                  title="Cancel"
                  stylingClass="meeting-card-btn btn-danger"
                  message="Are you sure canceling this meeting?"
                  fetchMeeting={fetchMeeting}
                  meetingID={data.id}
                />
              </>
            )}
            {!meetingComplete && isStudent && (
              <>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary meeting-card-btn"
                  to={{ pathname: joinURL }}
                >
                  Join
                </Link>
                {!notAttend ? (
                  <MeetingModal
                    title="Not Attend"
                    stylingClass="meeting-card-btn btn-secondary"
                    message="Are you sure not attending this meeting?"
                    fetchMeeting={fetchMeeting}
                    meetingID={data.id}
                  />
                ) : (
                  ""
                )}
              </>
            )}
            {meetingComplete && recordingURL && (
              <Link
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary meeting-card-btn"
                to={{ pathname: recordingURL }}
              >
                Recording
              </Link>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default MeetingCard;
