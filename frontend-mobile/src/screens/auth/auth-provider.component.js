import React, { createContext, useState, useEffect } from "react";
import * as Keychain from "react-native-keychain";
import { Spinner } from "@ui-kitten/components";
import Auth0 from "react-native-auth0";
import config from "../../../config";
import jwtDecode from 'jwt-decode'
import { WelcomeScreen } from './welcome-screen.component'
import { addSeconds, isPast, parseISO } from 'date-fns'
import { Alert } from 'react-native'

export const auth0 = new Auth0({
  domain: config.auth0.domain,
  clientId: config.auth0.clientId
});

export const AuthContext = createContext(null);

/**
 * Authentication Provider
 *
 * @param children
 * @returns {*}
 * @constructor
 */
export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const initialState = {
    refreshToken: null,
    idToken: null,
    expiryDate: new Date(),
    claims: {}
  };
  const [credentials, setCredentials] = useState(initialState);

  /**
   * Rehydrate any existing credentials from the secure keychain
   */
  useEffect(() => {
    async function rehydrateCredentials() {
      console.log("rehydrateCredentials");
      const keychain = await Keychain.getGenericPassword();
      console.log("KEYCHAIN: ",keychain);
      if (keychain) {
        setCredentials(JSON.parse(keychain.password));
      } else {
        console.log("no stored keychain");
      }
      setLoading(false);
    }
    rehydrateCredentials();
  }, []);

  /**
   * Authenticate a new user via Auth0's Universal Login page
   * @returns {Promise<void>}
   */
  const doLogin = async () => {
    try {
      const response = await auth0.webAuth.authorize({
        scope: "openid profile email offline_access"
      });
      // A bug in auth0? https://community.auth0.com/t/expires-in-value-is-always-86400/10549/5
      response.expiresIn = 36000;

      const credentials = {
        ...response,
        expiryDate: addSeconds(new Date(), response.expiresIn),
        claims: jwtDecode(response.idToken)
      };
      console.log("doLogin Auth good. Creds object:", credentials);

      setCredentials(credentials);

      await Keychain.setGenericPassword(
        "credentials",
        JSON.stringify(credentials)
      );
    } catch (error) {
      // TODO: Error toasts
      console.log("Auth error: ", error);
    }
  };

  /**
   * Logout a user and clear stored credentials
   * @returns {Promise<void>}
   */
  const doLogout = async () => {
    console.log('doing logout');
    try {
      const response = await auth0.webAuth.clearSession({})
      console.log('logged out ', response);
      Alert.alert("Logged out!");
      setCredentials(initialState);
      await Keychain.resetGenericPassword();
    } catch(error) {
      console.log("Log out cancelled");
    }
  }

  /**
   * Get ID token (JWT) for authenticating requests.
   * Either use stored one or if it's out of date, fetch a new one silently.
   * @param forceRefresh {boolean} TODO: Bad token should force refresh somehow.
   * @returns {Promise<void>}
   */
  const getIdTokenSilently = async (forceRefresh) => {
    console.log('EXPIRY DATE', parseISO(credentials.expiryDate));
    if(isPast(parseISO(credentials.expiryDate)) || forceRefresh) {
      console.log('getIdTokenSilently PAST');
      const response = await auth0.auth.refreshToken({
        refreshToken: credentials.refreshToken
      });

      // A bug in auth0? https://community.auth0.com/t/expires-in-value-is-always-86400/10549/5
      response.expiresIn = 36000;

      setCredentials({
        ...response,
        expiryDate: addSeconds(new Date(), response.expiresIn),
        claims: jwtDecode(response.idToken)
      });
      return response.idToken;
    } else {
      console.log('getIdTokenSilently NOT PAST');
      return credentials.idToken;
    }
  }

  // Getting token? Show loading
  if (loading) return <Spinner />;

  // No credentials? Show auth / welcome started screen
  if (!credentials.idToken) return <WelcomeScreen doLogin={doLogin}/>;

  // All authenticated? Show the app
  return (
    <AuthContext.Provider value={{ getIdTokenSilently, credentials, doLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
