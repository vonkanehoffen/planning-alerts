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

function Meta({ icon, title, value }) {
  return (
    <ListItem
      title={title}
      description={value}
      icon={icon ? () => <Icon name={icon} /> : false}
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
      // TODO: Not fuckin twice! In onLayout too.
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

  console.log("PA in PaStatsDetails", pa);
  return (
    <>
      <Card
        onLayout={e => {
          console.log("onLayout ani", e.nativeEvent.layout.height);
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
        {pa && (
          <>
            <Meta
              title={`${pa.open ? "Open" : "Closed"} Planning Application`}
              subtitle={pa.address}
            />
            <Meta
              title="Proposal"
              icon="briefcase-outline"
              value={pa.proposal}
            />
            <Meta
              title="Last Update"
              icon="calendar-outline"
              value={`${formatDistance(
                parseISO(pa.updated_at),
                new Date()
              )} ago`}
            />
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
          </>
        )}
      </Card>
      <TouchableOpacity style={styles.fab} onPress={resetRegion}>
        <LogoFab />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    backgroundColor: "#ffffff",
    position: "relative"
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10
  },
  footerControl: {
    marginHorizontal: 4
  },
  fab: {
    position: "absolute",
    right: 10,
    top: 10
  }
});
