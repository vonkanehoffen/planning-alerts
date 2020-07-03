import React from "react";
import { Pa_Status } from "../../generated/graphql";
import {
  Button,
  Icon,
  List,
  ListItem,
  StyleService
} from "@ui-kitten/components";
import { formatDistance, parseISO } from "date-fns";
import { Linking, StyleSheet, View } from "react-native";
import { Box } from "../../components/Box";

interface PaDetailsProps {
  pa: Pa_Status;
  unFocus: () => any;
}

export const PaDetails: React.FC<PaDetailsProps> = ({ pa, unFocus }) => {
  const renderItem = ({ item, index }: any) => (
    <ListItem
      title={item.title}
      description={item.value}
      accessoryLeft={
        item.icon ? props => <Icon {...props} name={item.icon} /> : undefined
      }
    />
  );

  const listData = pa && [
    {
      title: `${pa.open ? "Open" : "Closed"} Planning Application`,
      value: pa.address
    },
    {
      title: "Proposal",
      value: pa.proposal,
      icon: "briefcase-outline"
    },
    {
      title: "Last Update",
      value: `${formatDistance(parseISO(pa.updated_at), new Date())} ago`,
      icon: "calendar-outline"
    }
  ];

  return (
    <Box m={1}>
      <List data={listData} renderItem={renderItem} />
      <View style={styles.footerContainer}>
        <Button
          style={styles.backButton}
          size="small"
          status="basic"
          onPress={unFocus}
        >
          BACK
        </Button>
        <Button size="small" onPress={() => Linking.openURL(pa.url)}>
          MORE INFO
        </Button>
      </View>
    </Box>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10
  },
  backButton: {
    marginRight: 10
  }
});
