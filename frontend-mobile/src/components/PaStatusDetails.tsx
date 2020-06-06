import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  Linking,
  Animated,
  TouchableOpacity
} from "react-native";
import { Button, Card, Icon, ListItem } from "@ui-kitten/components";
import { LogoFab } from "./LogoFab";
import { formatDistance, parseISO } from "date-fns";
import { Pa_Status } from "../generated/graphql";

interface PaStatusDetailsProps {
  pa: Pa_Status | null;
  unFocusPa: () => any;
  resetRegion: () => any;
}

interface MetaProps {
  icon?: string;
  title: string;
  value: string;
}

function Meta({ icon, title, value }: MetaProps) {
  return (
    <ListItem
      title={title}
      description={value}
      accessoryLeft={icon ? () => <Icon name={icon} /> : undefined}
    />
  );
}

// TODO: Fix initial card flash with opacity?
export function PaStatusDetails({
  pa,
  unFocusPa,
  resetRegion
}: PaStatusDetailsProps) {
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
                // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/12202
                translateY: cardTranslate as any
              }
            ]
          }
        ]}
      >
        {pa && (
          <>
            <Meta
              title={`${pa.open ? "Open" : "Closed"} Planning Application`}
              value={pa.address}
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
