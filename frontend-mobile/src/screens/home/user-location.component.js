import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import * as queries from '../../data-layer/graphql-queries'
import { Layout, Text, Spinner } from '@ui-kitten/components'
import { PaMap } from './pa-map.component'
import _ from "lodash";
import { AuthContext } from '../auth/auth-provider.component'

export function UserLocation({ navigation }) {
  const { auth } = useContext(AuthContext)
  const { loading, error, data } = useQuery(queries.GET_USER_LOCATION, {
    variables: {
      id: auth.userInfo.sub
    }
  });

  if (loading) {
    return <Layout><Spinner/></Layout>;
  }

  if (error) {
    return (
      <Layout>
        <Text status="danger">{error.message}</Text>
      </Layout>
    );
  }

  const location = _.get(data, "users[0].location");

  if (!location) {
    navigation.navigate("set-location");
    return false;
  }

  return <PaMap userLocation={location} />;
}
