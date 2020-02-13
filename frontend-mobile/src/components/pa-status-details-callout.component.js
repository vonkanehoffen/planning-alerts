import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  CardHeader,
  Text,
  Icon,
  ListItem
} from "@ui-kitten/components";

const Header = () => (
  <CardHeader title="Planning Application" description="address here" />
);

const Footer = ({ unFocusPa }) => (
  <View style={styles.footerContainer}>
    <Button
      style={styles.footerControl}
      size="small"
      status="basic"
      onPress={unFocusPa}
    >
      BACK
    </Button>
    <Button style={styles.footerControl} size="small">
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
  return (
    <Card
      header={() => <Header pa={pa} />}
      footer={() => <Footer unFocusPa={unFocusPa} pa={pa} />}
      style={styles.card}
    >
      <Meta title="Proposal" icon="briefcase-outline" value={pa.proposal} />
      <Meta title="Address" icon="home-outline" value={pa.address} />
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
