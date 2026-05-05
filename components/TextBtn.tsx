import { Text, TouchableOpacity } from "react-native";

export const TextBtn = ({ text, onPress }:  TextBtnProps) => (
  <TouchableOpacity onPress={onPress} className="py-2">
    <Text className="text-blue-600">{text}</Text>
  </TouchableOpacity>
);