import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import useDebounce from "../../hooks/use-debounce";
import {
  useCouncil_AutocompleteLazyQuery,
  useSet_User_CouncilMutation
} from "../../generated/graphql";
import { Input, Layout, Text } from "@ui-kitten/components";
import { Suggestions } from "./Suggestions";
import { Box } from "../../components/Box";

interface SelectCouncilProps {}

export const SelectCouncil: React.FC<SelectCouncilProps> = ({}) => {
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
    <Box m={1}>
      <Text category="h3">Who are your Local Council?</Text>
      <Input
        placeholder="Start typing..."
        value={searchTerm}
        onChangeText={s => setSearchTerm(s)}
      />
      {data?.council && (
        <Suggestions data={data.council} onSelect={onSelect} selected={null} />
      )}
    </Box>
  );
};
