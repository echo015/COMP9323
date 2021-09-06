import React from "react";

const ErrorHandling = ({ errMsg }) => {
  return (
    <div className="container" style={{ marginTop: "45px" }}>
      <h3 style={{ color: "red" }}>
        ERROR CODE {errMsg.status}: {errMsg.statusText}
      </h3>
    </div>
  );
};

export default ErrorHandling;
