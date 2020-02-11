import React from 'react';
import {StyleSheet} from 'react-native';
import {Layout, Button, Text} from '@ui-kitten/components';
import { UserLocation } from './user-location.component'

export function HomeScreen({navigation}) {
  return (
    <Layout style={styles.container}>
      <Text category="h1">Home Screen</Text>
      <Button onPress={() => navigation.navigate('Settings')}>Settings</Button>
      <UserLocation navigation={navigation}/>
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
