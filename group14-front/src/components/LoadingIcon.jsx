import React from "react";
import loadingIcon from "../images/loadingIcon.svg";

const LoadingIcon = () => {
  return (
    <div className="loading-container">
      <img src={loadingIcon} alt="loading icon" />
    </div>
  );
};

export default LoadingIcon;
