import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  Linking,
  Animated,
  TouchableOpacity
} from "react-native";
import {
  Button,
  Card,
  CardHeader,
  Text,
  Icon,
  ListItem
} from "@ui-kitten/components";
import { LogoFab } from "./logo-fab.component";
import { formatDistance, parseISO } from "date-fns";

const Header = ({ pa }) => (
  <CardHeader
    title={`${pa.open ? "Open" : "Closed"} Planning Application`}
    description={pa.address}
  />
);

const Footer = ({ pa, handleBackButton }) => (
  <View style={styles.footerContainer}>
    <Button
      style={styles.footerControl}
      size="small"
      status="basic"
      onPress={handleBackButton}
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

// TODO: Fix initial card flash with opacity?
export function PaStatusDetails({ pa, unFocusPa, resetRegion }) {
  // console.log("PaStatusDetails ---- ", JSON.stringify(pa, null, 2));
  const [cardTranslate, setCardTranslate] = useState(new Animated.Value(0));
  const [cardHeight, setCardHeight] = useState(0);
  useLayoutEffect(() => {
    console.log("layouteffect", cardHeight, pa);
    if (pa) {
      cardTranslate.setValue(cardHeight);
      Animated.spring(cardTranslate, {
        toValue: 0,
        useNativeDriver: true
      }).start();
    }
  }, [pa]);

  const handleBackButton = () =>
    Animated.spring(cardTranslate, {
      toValue: cardHeight,
      useNativeDriver: true
    }).start(unFocusPa);

  console.log("card translate = ", cardTranslate);

  return (
    <>
      {pa && (
        <Card
          header={() => <Header pa={pa} />}
          footer={() => (
            <Footer
              unFocusPa={unFocusPa}
              pa={pa}
              handleBackButton={handleBackButton}
            />
          )}
          onLayout={e => {
            console.log("onLayout ani", e.nativeEvent.layout.height);
            cardTranslate.setValue(e.nativeEvent.layout.height);
            Animated.spring(cardTranslate, {
              toValue: 0,
              useNativeDriver: true
            }).start();
            setCardHeight(e.nativeEvent.layout.height);
          }}
          style={[
            styles.card,
            {
              transform: [
                {
                  translateY: cardTranslate
                }
              ]
            }
          ]}
        >
          <Meta title="Proposal" icon="briefcase-outline" value={pa.proposal} />
          <Meta
            title="Last Update"
            icon="calendar-outline"
            value={`${formatDistance(parseISO(pa.updated_at), new Date())} ago`}
          />
        </Card>
      )}
      <TouchableOpacity style={[styles.fab]} onPress={resetRegion}>
        <LogoFab />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%"
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  footerControl: {
    marginHorizontal: 4
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20
  }
});
