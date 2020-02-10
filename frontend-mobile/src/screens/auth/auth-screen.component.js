import React from 'react';
import {Alert, StyleSheet} from 'react-native';
import Auth0 from 'react-native-auth0';
import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import { AuthContext } from '../../App'

export const auth0 = new Auth0({
  domain: 'kanec.eu.auth0.com',
  clientId: 'QcSRHtExt8Zqjb66TejCF3jisKy1fSnY',
});

const HeartIcon = style => <Icon {...style} name="heart" />;

export function AuthScreen({navigation}) {
  // const [idToken, setIdToken] = React.useState(null);
  const [idToken, setIdToken] = React.useContext(AuthContext);
  const _onLogin = () => {
    auth0.webAuth
      .authorize({scope: 'openid profile email'})
      .then(credentials => {
          // Successfully authenticated
          // Store the idToken
          console.log('creds -', credentials);
          setIdToken(credentials.idToken)
      })
      .catch(error => console.log(error));
  };

  const loggedIn = false; //TODO: logout should be on settings menu
  return (
    <Layout style={styles.container}>
      <Button
        icon={HeartIcon}
        onPress={loggedIn ? _onLogout : _onLogin}>
        {loggedIn ? 'Log Out' : 'Log In'}
      </Button>
    </Layout>
  );
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
});
