import React from 'react';
import {Alert, StyleSheet} from 'react-native';
import Auth0 from 'react-native-auth0';
import {Button, Icon, Layout, Text} from '@ui-kitten/components';

const auth0 = new Auth0({
  domain: 'kanec.eu.auth0.com',
  clientId: 'QcSRHtExt8Zqjb66TejCF3jisKy1fSnY',
});

const HeartIcon = style => <Icon {...style} name="heart" />;

export function AuthScreen({navigation}) {
  const [accessToken, setAccessToken] = React.useState(null);

  const _onLogin = () => {
    auth0.webAuth
      .authorize({scope: 'openid profile email'})
      .then(credentials =>
        // Successfully authenticated
        // Store the accessToken
        setAccessToken(credentials.accessToken),
      )
      .catch(error => console.log(error));
  };

  const _onLogout = () => {
    auth0.webAuth
      .clearSession({})
      .then(success => {
        Alert.alert('Logged out!');
        setAccessToken(null);
      })
      .catch(error => {
        console.log('Log out cancelled');
      });
  };

  let loggedIn = accessToken !== null;

  return (
    <Layout style={styles.container}>
      <Text>
        You are{loggedIn ? ' ' : ' not '}logged in . {accessToken}
      </Text>
      <Button
        style={styles.likeButton}
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
