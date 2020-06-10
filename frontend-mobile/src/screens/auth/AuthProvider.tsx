import React, { createContext, useState, useEffect, useContext } from "react";
import * as Keychain from "react-native-keychain";
import Auth0 from "react-native-auth0";
import config from "../../../config.json";
import jwtDecode from "jwt-decode";
import { WelcomeScreen } from "./WelcomeScreen";
import { addSeconds, isPast, parseISO } from "date-fns";
import { Alert } from "react-native";
import { FullScreenLoader } from "../../components/FullScreenLoader";

interface getIdTokenSilently {
  (forceRefresh?: boolean): Promise<string>;
}

type credentials = {
  refreshToken: null | string;
  idToken: null | string;
  expiryDate: Date;
  claims: any;
};

interface doLogout {
  (): Promise<any>;
}

interface AuthContextState {
  getIdTokenSilently: getIdTokenSilently;
  credentials: credentials;
  doLogout: doLogout;
}

export const auth0 = new Auth0({
  domain: config.auth0.domain,
  clientId: config.auth0.clientId
});

export const AuthContext = createContext({} as AuthContextState);

export const useAuth = () => useContext(AuthContext);

/**
 * Authentication Provider
 *
 * @param children
 * @returns {*}
 * @constructor
 */
export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const initialState: credentials = {
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
      console.log("KEYCHAIN: ", keychain);
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

      await Keychain.setGenericPassword(
        "credentials",
        JSON.stringify(credentials)
      );

      setCredentials(credentials);
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
    console.log("doing logout");
    try {
      // @ts-ignore
      const response = await auth0.webAuth.clearSession({});
      console.log("logged out ", response);
      Alert.alert("Logged out!");
      setCredentials(initialState);
      await Keychain.resetGenericPassword();
    } catch (error) {
      console.log("Log out cancelled");
    }
  };

  /**
   * Get ID token (JWT) for authenticating requests.
   * Either use stored one or if it's out of date, fetch a new one silently.
   * @param forceRefresh {boolean} TODO: Bad token should force refresh somehow.
   * @returns {Promise<void>}
   */
  const getIdTokenSilently: getIdTokenSilently = async (
    forceRefresh = false
  ) => {
    // @ts-ignore
    const expiryDate = parseISO(credentials.expiryDate);
    if (isPast(expiryDate) || forceRefresh) {
      console.log("getIdTokenSilently - refreshing", forceRefresh && "forced");
      const response = await auth0.auth.refreshToken({
        // @ts-ignore
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
      return credentials.idToken;
    }
  };

  // Getting token? Show loading
  if (loading) return <FullScreenLoader message="Loading Profile" />;

  // No credentials? Show auth / welcome started screen
  if (!credentials.idToken) return <WelcomeScreen doLogin={doLogin} />;

  // All authenticated? Show the app
  return (
    // @ts-ignore
    <AuthContext.Provider value={{ getIdTokenSilently, credentials, doLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
