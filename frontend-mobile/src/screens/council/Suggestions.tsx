import React from "react";
import { Keyboard, StyleSheet } from "react-native";
import { Icon, List, ListItem } from "@ui-kitten/components";

interface SuggestionProps {
  data: Array<{
    id: number;
    title: string;
  }>;
  onSelect: (value: any) => any;
  selected: number | null;
}

// TODO: Use UIK list el with adornment
export const Suggestions: React.FC<SuggestionProps> = ({
  data,
  onSelect,
  selected
}) => {
  const homeIcon = (props: any) => <Icon {...props} name="home" />;

  const checkIcon = (props: any) => (
    <Icon {...props} name="checkmark-circle-2" />
  );

  const renderItem = ({ item, index }: any) => (
    <ListItem
      title={item.title}
      accessoryLeft={homeIcon}
      accessoryRight={selected === item.id ? checkIcon : undefined}
      onPress={() => {
        onSelect(item);
        Keyboard.dismiss();
      }}
    />
  );

  return (
    <List
      data={data}
      renderItem={renderItem}
      keyboardShouldPersistTaps="handled"
    />
  );
};

const styles = StyleSheet.create({
  option: {
    display: "flex",
    // flexDirection: "row",
    padding: 10
  },
  icon: {
    width: 16,
    height: 16
  }
});
