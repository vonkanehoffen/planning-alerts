import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import useDebounce from "../../hooks/use-debounce";
import {
  Get_User_MetaDocument,
  Get_User_MetaQuery,
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
  const [setUserCouncil, { data: mutationData }] = useSet_User_CouncilMutation({
    // update(cache, mutationResponse) {
    //   let data = cache.readQuery<Get_User_MetaQuery>({
    //     query: Get_User_MetaDocument,
    //     variables: {
    //       id: credentials.claims.sub
    //     }
    //   });
    //   if(data?.users_by_pk) {
    //     data.users_by_pk.council = mutationResponse.data?.update_users_by_pk?.council // add here
    //   }
    // }
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
      variables: { id: credentials.claims.sub, council_id: council.id }
    };
    console.log("SETTING COUNCIL", args);
    setUserCouncil(args);
  };

  return (
    <>
      <Box m={1}>
        <Text category="h4">Hi! Let's get started...</Text>
      </Box>
      <Box m={1}>
        <Text category="h3">Who are your Local Council?</Text>
      </Box>
      <Box m={1}>
        <Input
          placeholder="Start typing..."
          value={searchTerm}
          onChangeText={s => setSearchTerm(s)}
        />
        {data?.council ? (
          <Suggestions
            data={data.council}
            onSelect={onSelect}
            selected={null}
          />
        ) : (
          <Box mt={1}>
            <Text category="c1">
              (We'll tell you if they're covered in the app yet.)
            </Text>
          </Box>
        )}
      </Box>
    </>
  );
};
