import React from 'react';
import {StyleSheet} from 'react-native';
import PaMap from '../paMap/PaMap';
import {Layout, Button, Text} from '@ui-kitten/components';

export function HomeScreen({navigation}) {
  return (
    <Layout style={styles.container}>
      <Text category="h1">Home Screen</Text>
      <PaMap />
      <Button onPress={() => navigation.navigate('Settings')}>Settings</Button>
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
