import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="page-footer font-small bg-light fixed-bottom">
        <div className="text-center p-3">
          &copy;{new Date().getFullYear()} Copyright: Group 14
        </div>
      </footer>
    </>
  );
};

export default Footer;
