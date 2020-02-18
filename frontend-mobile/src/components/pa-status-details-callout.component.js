import React from "react";
import { StyleSheet, View, Linking } from "react-native";
import {
  Button,
  Card,
  CardHeader,
  Text,
  Icon,
  ListItem
} from "@ui-kitten/components";
import { formatDistance, parseISO } from "date-fns";

const Header = ({ pa }) => (
  <CardHeader
    title={`${pa.open ? "Open" : "Closed"} Planning Application`}
    description={pa.address}
  />
);

const Footer = ({ pa, unFocusPa }) => (
  <View style={styles.footerContainer}>
    <Button
      style={styles.footerControl}
      size="small"
      status="basic"
      onPress={unFocusPa}
    >
      BACK
    </Button>
    <Button
      style={styles.footerControl}
      size="small"
      onPress={() => Linking.openURL(pa.url)}
    >
      MORE INFO
    </Button>
  </View>
);

function Meta({ icon, title, value }) {
  return (
    <ListItem
      title={title}
      description={value}
      icon={() => <Icon name={icon} />}
    />
  );
}

export function PaStatusDetails({ pa, unFocusPa }) {
  console.log("PaStatusDetails ---- ", JSON.stringify(pa, null, 2));
  return (
    <Card
      header={() => <Header pa={pa} />}
      footer={() => <Footer unFocusPa={unFocusPa} pa={pa} />}
      style={styles.card}
    >
      <Meta title="Proposal" icon="briefcase-outline" value={pa.proposal} />
      <Meta
        title="Last Update"
        icon="calendar-outline"
        value={`${formatDistance(parseISO(pa.updated_at), new Date())} ago`}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%"
    // marginLeft: 20,
    // marginRight: 20
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  footerControl: {
    marginHorizontal: 4
  }
});
