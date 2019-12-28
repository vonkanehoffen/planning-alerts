import React from "react";
import { TextField, Button } from "@material-ui/core";

export default function SetLocation() {
  const [address, setAddress] = React.useState("");
  return (
    <div>
      <h1>Set location</h1>
      <TextField value={address} onChange={e => setAddress(e.target.value)} />
      <Button variant="contained">Get location</Button>
    </div>
  );
}
