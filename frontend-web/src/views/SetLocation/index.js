import React from "react";
import { TextField, Button } from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_USER_LOCATION, UPDATE_USER_LOCATION } from "../../gql/queries";

export default function SetLocation() {
  const [address, setAddress] = React.useState("");
  const variables = {
    id: localStorage.getItem("auth0:id_token:sub")
  };
  const { loading, error, data: userData } = useQuery(GET_USER_LOCATION, {
    variables
  });
  const [setLocation, { data }] = useMutation(UPDATE_USER_LOCATION, {
    update(
      cache,
      {
        data: {
          update_users: { returning }
        }
      }
    ) {
      // const { q } = cache.readQuery({ query: GET_USER_LOCATION, variables });
      // console.log('q = ', q);
      cache.writeQuery({
        query: GET_USER_LOCATION,
        variables,
        data: { users: returning }
      });
    }
  });

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
      <h4>user data</h4>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
      <h4>mutation response</h4>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
