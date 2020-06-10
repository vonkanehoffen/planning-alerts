import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  Linking,
  Animated,
  TouchableOpacity
} from "react-native";
import { Button, Card, Icon, List, ListItem } from "@ui-kitten/components";
import { LogoFab } from "../../components/LogoFab";
import { formatDistance, parseISO } from "date-fns";
import { Pa_Status } from "../../generated/graphql";

interface PaStatusDetailsProps {
  pa: Pa_Status | null;
  unFocusPa: () => any;
  resetRegion: () => any;
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
            <List style={styles.list} data={listData} renderItem={renderItem} />
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
    maxHeight: "60%",
    backgroundColor: "#ffffff",
    position: "relative"
  },
  list: {
    // maxHeight: 192,
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
