import React, { useEffect, useState } from 'react'
import { Input, Layout, Text, useTheme, Autocomplete, AutocompleteItem } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import { useCouncil_AutocompleteLazyQuery } from '../../generated/graphql'
import { FullScreenLoader } from '../../components/FullScreenLoader'
import useDebounce from '../../hooks/use-debounce';

interface SetCouncilScreenProps {

}

export const SetCouncilScreen: React.FC<SetCouncilScreenProps> = ({}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [loadCouncilAutocomplete, { called, loading, data, error }] = useCouncil_AutocompleteLazyQuery();

  useEffect(
    () => {
      if(debouncedSearchTerm) {
        loadCouncilAutocomplete({ variables: { input: `%${debouncedSearchTerm}%`}});
      }
    }, [debouncedSearchTerm]
  );

  const onSelect = (index: number) => {
    setSearchTerm(data?.council[index].title || '');
    console.log('onSelect', index);
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
