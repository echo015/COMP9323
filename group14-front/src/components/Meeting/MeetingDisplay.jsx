import React from "react";
import moment from "moment";

const MeetingDisplay = ({ data }) => {
  const {
    topic: title,
    agenda,
    start_time: date,
    duration,
    user_id,
    attendees,
  } = data;
  const startTime = moment(date).format("h:mm A");
  const startDate = moment(date).format("DD/MM/YYYY");
  const endTime = moment(date).add(duration, "minutes").format("h:mm A");
  const formatAgenda = agenda.split("\n");
  const numberOfAttendess = attendees.split("\n");

  return (
    <>
      <div className="meeting-display">
        <h3 style={{ textAlign: "center" }}>{title}</h3>
        <p>
          <strong>Date: </strong>
          {startDate}
        </p>
        <p>
          <strong>Time: </strong>
          {startTime} - {endTime}
        </p>
        <p>
          <strong>Host: </strong>
          {user_id}
        </p>
        <p>
          <strong>Number of Attendees: </strong>
          {numberOfAttendess.length}
        </p>
        <hr />
        <p>
          <strong>Agenda Details</strong>
        </p>
        <ul className="meeting-agenda-list">
          {formatAgenda.map(function (text, i) {
            if (!text) return null;
            return <li key={`agendaList${i}`}>{text}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default MeetingDisplay;
