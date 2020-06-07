import React, { useContext, useEffect, useState } from "react";
import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import {
  Get_User_MetaDocument,
  useCouncil_AutocompleteLazyQuery,
  useGet_User_MetaQuery,
  useSet_User_CouncilMutation
} from "../../generated/graphql";
import useDebounce from "../../hooks/use-debounce";
import { AuthContext } from "../auth/AuthProvider";
import { Suggestions } from "./Suggestions";
import { SelectCouncil } from "./SelectCouncil";

interface CouncilScreenProps {}

export const CouncilScreen: React.FC<CouncilScreenProps> = ({}) => {
  const { credentials } = useContext(AuthContext);
  const [
    setUserCouncil,
    { data: mutationData }
  ] = useSet_User_CouncilMutation();

  const { loading, data: userMeta, error } = useGet_User_MetaQuery({
    variables: {
      id: credentials.claims.sub
    }
  });

  const unsetCouncil = () => {
    setUserCouncil({
      variables: { user_id: credentials.claims.sub, council_id: null }
    });
  };

  return (
    <Layout style={styles.container}>
      {userMeta?.users[0].council ? (
        <View>
          <Text category="s1">Council selected:</Text>
          <Text category="h4">{userMeta?.users[0].council.title}</Text>
          {userMeta?.users[0].council.scraper !== "idox" && (
            <Text category="h6" status="danger">
              Sorry, your council is not covered by Planning Alerts yet. TODO:
              Let me know fn
            </Text>
          )}
          <Button onPress={unsetCouncil}>Change selection</Button>
        </View>
      ) : (
        <SelectCouncil />
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 60
  },
  intro: {
    paddingTop: 20,
    paddingBottom: 20
  },
  or: {
    paddingTop: 20,
    paddingBottom: 20
  }
});
