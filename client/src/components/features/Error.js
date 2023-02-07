import React from "react";
import { Alert } from "reactstrap";
const Error = ({ error }) => {
  return (
    <Alert color="danger" style={{ textAlign: "left" }}>
      {error}
    </Alert>
  );
};

export default Error;
