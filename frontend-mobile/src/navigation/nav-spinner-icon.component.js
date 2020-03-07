import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { Icon, Spinner } from '@ui-kitten/components'
import { useApolloNetworkStatus } from 'react-apollo-network-status'

export function NavSpinnerIcon() {
  const navigation = useNavigation();
  const status = useApolloNetworkStatus();

  if(status.numPendingQueries > 0 || status.numPendingMutations > 0) {
    return <Spinner/>
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
      <Icon name="settings-outline" width={32} height={32} fill="#3366FF" />
    </TouchableOpacity>
  );
}
