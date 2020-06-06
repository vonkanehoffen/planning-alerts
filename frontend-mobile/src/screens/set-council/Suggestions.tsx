import React from "react";
import { TouchableHighlight, View, StyleSheet, ScrollView } from "react-native";
import { Text } from "@ui-kitten/components";

interface SuggestionProps {
  data: Array<{
    id: number
    title: string
  }>;
  onSelect: (value: any) => any;
}

export const Suggestions: React.FC<SuggestionProps> = ({ data, onSelect }) => {
  return (
    <ScrollView>
      {data.map(e => (
        <TouchableHighlight onPress={() => onSelect(e)}>
          <View style={styles.button}>
            <Text category="s1">{e.title}</Text>
          </View>
        </TouchableHighlight>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10
  }
});
