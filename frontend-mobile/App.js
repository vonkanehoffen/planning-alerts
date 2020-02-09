/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the UI Kitten template
 * https://github.com/akveo/react-native-ui-kitten
 *
 * Documentation: https://akveo.github.io/react-native-ui-kitten/docs
 *
 * @format
 */

import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {
  mapping,
  light as theme,
} from '@eva-design/eva';
import Auth0 from 'react-native-auth0';
import PaMap from './scenes/paMap/PaMap'

const auth0 = new Auth0({ domain: 'kanec.eu.auth0.com', clientId: 'QcSRHtExt8Zqjb66TejCF3jisKy1fSnY' });

/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */
const HeartIcon = (style) => (
  <Icon {...style} name='heart'/>
);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { accessToken: null };
  }

  _onLogin = () => {
    auth0
      .webAuth
      .authorize({scope: 'openid profile email'})
      .then(credentials =>
        // Successfully authenticated
        // Store the accessToken
        this.setState({ accessToken: credentials.accessToken })
      )
      .catch(error => console.log(error));
  }

  _onLogout = () => {
    auth0.webAuth
      .clearSession({})
      .then(success => {
        Alert.alert('Logged out!');
        this.setState({ accessToken: null });
      })
      .catch(error => {
        console.log('Log out cancelled');
      });
  };

  render () {
    let loggedIn = this.state.accessToken === null ? false : true;

    return (
      <>
        <IconRegistry icons={EvaIconsPack}/>
        <ApplicationProvider mapping={mapping} theme={theme}>
          <Layout style={styles.container}>
            <PaMap/>
            <Text style={styles.text} category='h1'>
              Welcome to UI Kitten map 😻
            </Text>
            <Text style={styles.text} category='s1'>
              Start with editing App.js to configure your App
            </Text>
            <Text style={styles.text} appearance='hint'>
              For example, try changing theme to Dark by simply changing an import
            </Text>
            <Text>
              You are{ loggedIn ? ' ' : ' not ' }logged in . {this.state.accessToken}</Text>
            <Button style={styles.likeButton} icon={HeartIcon} onPress = { loggedIn ? this._onLogout : this._onLogin }>
              { loggedIn ? 'Log Out' : 'Log In' }
            </Button>
          </Layout>
        </ApplicationProvider>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
});

export default App;
