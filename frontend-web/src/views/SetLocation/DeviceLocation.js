import React from "react";
import { Button, CircularProgress } from "@material-ui/core";
import Error from "../../components/Error";

export default function DeviceLocation({ setLocation }) {
  const [fetching, setFetching] = React.useState(false);
  const [error, setError] = React.useState("");

  const getDeviceLocation = () => {
    if (navigator.geolocation) {
      setFetching(true);
      navigator.geolocation.getCurrentPosition(
        position => {
          setFetching(false);
          setError("");
          setLocation(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setFetching(false);
          setError("Could not get location.");
        }
      );
    } else {
      setError("Sorry, your browser does not support Geolocation.");
    }
  };
  return (
    <div>
      <Button onClick={getDeviceLocation} variant="contained" color="primary">
        Use current location
      </Button>
      {fetching && <CircularProgress />}
      {error && <Error message={error} />}
    </div>
  );
}
