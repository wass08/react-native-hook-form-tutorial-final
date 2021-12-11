import React from "react";
import { View } from "react-native";
import { tailwind } from "tailwind";

interface CardProps {
  children: React.ReactNode;
}

export const Card: React.FunctionComponent<CardProps> = ({ children }) => {
  return (
    <View style={tailwind("p-4 rounded drop-shadow-card bg-white")}>
      {children}
    </View>
  );
};
