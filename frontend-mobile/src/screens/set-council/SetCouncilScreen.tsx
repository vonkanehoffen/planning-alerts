import React from 'react'
import { Layout, Text, useTheme } from "@ui-kitten/components";
import { StyleSheet } from 'react-native'

interface SetCouncilScreenProps {

}

export const SetCouncilScreen: React.FC<SetCouncilScreenProps> = ({}) => {
  return (
    <Layout style={styles.container}>
      <Text category="h3">Who are your Local Council?</Text>
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
