import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_USER_LOCATION, UPDATE_USER_LOCATION } from "../../gql/queries";
import { useAuth0 } from "../../react-auth0-spa";
import PostcodeLookup from "./PostcodeLookup";
import DeviceLocation from "./DeviceLocation";
import CenterVh from "../../components/CenterVh";
import { Box, Typography } from "@material-ui/core";

export default function SetLocation() {
  const { user } = useAuth0();
  const variables = {
    id: user.sub
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

  const doSetLocation = (lat, lon) => {
    console.log("set ", lat, lon);
    setLocation({
      variables: {
        id: user.sub,
        location: {
          type: "Point",
          coordinates: [lat, lon]
        }
      }
    });
  };
  return (
    <CenterVh>
      <Box>
        <Typography variant="h3">Set location</Typography>
        <Box display="flex" alignItems="flex-end">
          <PostcodeLookup setLocation={doSetLocation} />
          <DeviceLocation setLocation={doSetLocation} />
        </Box>
        <h4>user data</h4>
        <pre>{JSON.stringify(userData, null, 2)}</pre>
        <h4>mutation response</h4>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Box>
    </CenterVh>
  );
}
