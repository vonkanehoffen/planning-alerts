import React from "react";
import { TextField, Button } from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_USER_LOCATION } from "../gql/queries";

export default function SetLocation() {
  const [address, setAddress] = React.useState("");
  const [setLocation, { data }] = useMutation(UPDATE_USER_LOCATION);

  const doSetLocation = () => {
    setLocation({
      variables: {
        id: localStorage.getItem("auth0:id_token:sub"),
        location: {
          type: "Point",
          // 'coordinates': [53.4924094,-1.5816169]
          coordinates: [53.4446175, -2.2748731]
        }
      }
    });
  };
  return (
    <div>
      <h1>Set location</h1>
      <TextField value={address} onChange={e => setAddress(e.target.value)} />
      <Button variant="contained" onClick={doSetLocation}>
        Set location
      </Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
