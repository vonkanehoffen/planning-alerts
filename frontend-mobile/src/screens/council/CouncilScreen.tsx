import React, { useContext, useEffect, useState } from "react";
import { Input, Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import {
  Get_User_MetaDocument,
  useCouncil_AutocompleteLazyQuery,
  useGet_User_MetaQuery,
  useSet_User_CouncilMutation
} from "../../generated/graphql";
import useDebounce from "../../hooks/use-debounce";
import { AuthContext } from "../auth/AuthProvider";
import { Suggestions } from "./Suggestions";

interface CouncilScreenProps {}

export const CouncilScreen: React.FC<CouncilScreenProps> = ({}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { credentials } = useContext(AuthContext);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [
    loadCouncilAutocomplete,
    { called, loading, data, error }
  ] = useCouncil_AutocompleteLazyQuery();
  const [
    setUserCouncil,
    { data: mutationData }
  ] = useSet_User_CouncilMutation();
  const {
    loading: userLoading,
    data: userData,
    error: userError
  } = useGet_User_MetaQuery({
    variables: {
      id: credentials.claims.sub
    }
  });

  useEffect(() => {
    if (debouncedSearchTerm) {
      loadCouncilAutocomplete({
        variables: { input: `%${debouncedSearchTerm}%` }
      });
    }
  }, [debouncedSearchTerm]);

  const onSelect = (council: any) => {
    console.log("onSelect", council, credentials.claims.sub);
    const args = {
      variables: { user_id: credentials.claims.sub, council_id: council.id }
    };
    console.log("SETTING COUNCIL", args);
    setUserCouncil(args);
  };

  console.log(data, error);
  return (
    <Layout style={styles.container}>
      <Text category="s1">
        User council: {JSON.stringify(userData?.users[0].council_id, null, 2)}
      </Text>
      <Text category="h3">Who are your Local Council?</Text>
      <Input
        placeholder="Start typing..."
        value={searchTerm}
        onChangeText={s => setSearchTerm(s)}
      />
      {data?.council && (
        <Suggestions
          data={data.council}
          onSelect={onSelect}
          selected={userData?.users[0].council_id || null}
        />
      )}

      {/*{(called && loading) && <Text>Loading Lazy Auto</Text>}*/}
      {/*<Text category="p1">{JSON.stringify(data?.council, null, 2)}</Text>*/}
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
