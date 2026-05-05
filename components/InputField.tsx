import { Text, TextInput, View } from "react-native";

export const InputField = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType = "default",
  error,
  containerClassName = "",
}: InputFieldProps) => (
  <View className={containerClassName}>
    <TextInput
      className="w-full border border-gray-300 rounded-xl px-4 py-3"
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize="none"
    />
    {error && <Text className="text-red-500">{error}</Text>}
  </View>
);
