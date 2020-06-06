import React, { useContext, useEffect, useState } from 'react'
import { Input, Layout, Text, useTheme, Autocomplete, AutocompleteItem } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import { useCouncil_AutocompleteLazyQuery, useSet_User_CouncilMutation } from '../../generated/graphql'
import { FullScreenLoader } from '../../components/FullScreenLoader'
import useDebounce from '../../hooks/use-debounce';
import { AuthContext } from '../auth/AuthProvider'

interface SetCouncilScreenProps {

}

export const SetCouncilScreen: React.FC<SetCouncilScreenProps> = ({}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [loadCouncilAutocomplete, { called, loading, data, error }] = useCouncil_AutocompleteLazyQuery();
  const [setUserCouncil, {data: mutationData }] = useSet_User_CouncilMutation()
  const { credentials } = useContext(AuthContext);

  useEffect(
    () => {
      if(debouncedSearchTerm) {
        loadCouncilAutocomplete({ variables: { input: `%${debouncedSearchTerm}%`}});
      }
    }, [debouncedSearchTerm]
  );

  const onSelect = (index: number) => {
    setSearchTerm(data?.council[index].title || '');
    console.log('onSelect', index, credentials.claims.sub);
    // TODO: This is just the index of the suggestion not the actual council. ....so it doesn't work.
    const args = { variables: { user_id: credentials.claims.sub, council_id: index}}
    console.log('SETTING COUNCIL', args);
    setUserCouncil(args);
  }

  console.log(data, error);
  return (
    <Layout style={styles.container}>
      <Text category="h3">Who are your Local Council asc?</Text>
      <Autocomplete placeholder="Start typing" value={searchTerm} onSelect={onSelect} onChangeText={s => setSearchTerm(s)}>
        {data?.council.map(council => {
          console.log('AUTOSUGGESTION', council.id, council.title);
          return <AutocompleteItem key={council.id} title={council.title} />
        })}
      </Autocomplete>
      {/*{(called && loading) && <Text>Loading Lazy Auto</Text>}*/}
      {/*<Text category="p1">{JSON.stringify(data?.council, null, 2)}</Text>*/}
    </Layout>
    )
}

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
