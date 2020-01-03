import React from "react";
import PropTypes from "prop-types";

export default function Error({ message }) {
  return <div style={{ color: "red", fontWeight: "bold" }}>{message}</div>;
}
