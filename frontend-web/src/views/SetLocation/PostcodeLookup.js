import React from "react";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import config from "../../config.json";
import Error from "../../components/Error";

export default function PostcodeLookup({ setLocation }) {
  const [postcode, setPostcode] = React.useState("");
  const [fetching, setFetching] = React.useState(false);
  const [error, setError] = React.useState("");

  const doPostcodeLookup = () => {
    const params = new URLSearchParams();
    params.append("address", postcode);
    params.append("key", config.googleApiKey);

    setFetching(true);

    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?${params.toString()}`
    )
      .then(res => res.json())
      .then(location => {
        setFetching(false);
        setError("");
        if (location.results.length < 1 || !location.results[0].geometry) {
          setError(location.error_message || "Could not find location");
        } else {
          setLocation(
            location.results[0].geometry.location.lat,
            location.results[0].geometry.location.lng
          );
        }
      })
      .catch(err => {
        setFetching(false);
        setError(err.message);
      });
  };

  return (
    <div>
      <TextField
        value={postcode}
        onChange={e => setPostcode(e.target.value)}
        label="Postcode"
      />
      <Button variant="contained" color="primary" onClick={doPostcodeLookup}>
        Lookup
      </Button>
      {fetching && <CircularProgress />}
      {error && <Error message={error} />}
    </div>
  );
}
