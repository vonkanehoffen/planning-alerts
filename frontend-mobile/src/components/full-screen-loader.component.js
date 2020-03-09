import React from 'react';
import {Layout, Spinner, Text} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export default function FullScreenLoader({message}) {
  return (
      <Layout style={styles.container}>
        <Spinner size="large"/>
        {message && <Text style={styles.message} status="info">{message}</Text>}
      </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  message: {
    marginTop: 10
  }
});
