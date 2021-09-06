import React from "react";
import moment from "moment";

const TaskDisplay = ({ data }) => {
  const { Task_title, Description, EndTime, Creator_email, Recv_email } = data;
  // console.log(data);
  const displayTime = moment(EndTime).format("DD/MM/YYYY h:mm A");
  return (
    <>
      <div>
        <h3 style={{ textAlign: "center" }}>{Task_title}</h3>
        <p>
          <strong>Description</strong>
        </p>
        {Description}
        <hr />
        <p>
          <strong>Deadline: </strong>
          {displayTime}
        </p>
        <p>
          <strong>Creator: </strong>
          {Creator_email}
        </p>
        <p>
          <strong>Participants: </strong>
          {Recv_email}
        </p>
      </div>
    </>
  );
};

export default TaskDisplay;
