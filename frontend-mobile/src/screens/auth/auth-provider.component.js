import React, { createContext, useState, useEffect } from "react";
import { AuthScreen } from "./auth-screen.component";
import * as Keychain from "react-native-keychain";
import { Spinner } from "@ui-kitten/components";
import Auth0 from "react-native-auth0";
import config from "../../../config";

export const auth0 = new Auth0({
  domain: config.auth0.domain,
  clientId: config.auth0.clientId
});

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(null);

  // If we have a refresh token already, get a new JWT + user info
  useEffect(() => {
    async function getToken() {
      console.log("getting refresh token");
      const keychain = await Keychain.getGenericPassword();
      if (keychain) {
        // TODO: Store + use old jwt when valid. Refresh takes ages.
        const credentials = await auth0.auth.refreshToken({
          refreshToken: keychain.password
        });
        const userInfo = await auth0.auth.userInfo({
          token: credentials.accessToken
        });
        console.log("rt done", userInfo);
        setAuth({ credentials, userInfo });
      } else {
        console.log("no stored keychain");
      }
      setLoading(false);
    }
    getToken();
  }, []);

  // Getting token? Show loading
  if (loading) return <Spinner />;

  // No credentials? Show auth screen
  if (!auth) return <AuthScreen setAuth={setAuth} />;

  // All authenticated? Show the app
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
