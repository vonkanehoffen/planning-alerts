import React from 'react'
import { Input, Layout, Text, useTheme } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import { useCouncil_AutocompleteLazyQuery } from '../../generated/graphql'
import { FullScreenLoader } from '../../components/FullScreenLoader'

interface SetCouncilScreenProps {

}

export const SetCouncilScreen: React.FC<SetCouncilScreenProps> = ({}) => {
  const [loadCouncilAutocomplete, { called, loading, data, error }] = useCouncil_AutocompleteLazyQuery();

  console.log(data, error);
  return (
    <Layout style={styles.container}>
      <Text category="h3">Who are your Local Council?</Text>
      <Input label="Council" onChangeText={s => loadCouncilAutocomplete({ variables: { input: `%${s}%`}})}/>
      {(called && loading) && <Text>Loading Lazy Auto</Text>}
      <Text category="p1">{JSON.stringify(data?.council, null, 2)}</Text>
    </Layout>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
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
