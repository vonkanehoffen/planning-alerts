import React from 'react';
import {StyleSheet} from 'react-native';
import PaMap from './PaMap';
import {Layout, Button, Text} from '@ui-kitten/components';
import { GQLTest } from './GQLTest'

export function HomeScreen({navigation}) {
  return (
    <Layout style={styles.container}>
      <Text category="h1">Home Screen</Text>
      <PaMap />
      <Button onPress={() => navigation.navigate('Settings')}>Settings</Button>
      <GQLTest/>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
