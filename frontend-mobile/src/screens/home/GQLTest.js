import React from 'react';
import {StyleSheet} from 'react-native';
import {Layout, Button, Text} from '@ui-kitten/components';
import { useQuery } from '@apollo/react-hooks'
import { TEST_QUERY } from '../../data-layer/graphql-queries'

export function GQLTest() {
  const { loading, error, data } = useQuery(TEST_QUERY);
  console.log("GQLTEST", loading, error, data);
  if(loading) return <Text>Loading</Text>;
  if(error) return <Text>Error: {error.message}</Text>;

  return (
    <Text category="p1">
      {JSON.stringify(data, null, 2)}
    </Text>
  )
}
