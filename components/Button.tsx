import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

export const Button = ({ text, onPress, loading }: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={loading}
    className="w-full bg-blue-600 rounded-xl py-4 items-center"
  >
    {loading ? (
      <ActivityIndicator color="white" />
    ) : (
      <Text className="text-white font-bold">{text}</Text>
    )}
  </TouchableOpacity>
);
