import { Image, Text, View } from "react-native";

export const Header = ({ title, subtitle }: HeaderType) => (
  <View className="gap-2">
    <Image
      source={require("../assets/images/kribb.png")}
      className="w-32 h-16"
      resizeMode="contain"
    />
    <Text className="text-3xl font-bold text-gray-800">{title}</Text>
    <Text className="text-gray-500">{subtitle}</Text>
  </View>
);
