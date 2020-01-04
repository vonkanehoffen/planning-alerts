import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER_LOCATION } from "../../gql/queries";
import View from "../../components/View";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import PlanningMap from "./PlanningMap";
import _ from "lodash";
import { navigate } from "@reach/router";

export default function UserLocation() {
  const { user } = useAuth0();
  const { loading, error, data } = useQuery(GET_USER_LOCATION, {
    variables: {
      id: user.sub
    }
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <View>
        <Error message={error} />
      </View>
    );
  }

  const location = _.get(data, "users[0].location");

  if (!location) {
    navigate("set-location");
    return false;
  }

  return <PlanningMap userLocation={location} />;
}
