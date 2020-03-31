import React from "react";
import { CircularProgress } from "@material-ui/core";
import CenterVh from "./CenterVh";

export default function Loading() {
  return (
    <CenterVh>
      <CircularProgress size={80} />
    </CenterVh>
  );
}
