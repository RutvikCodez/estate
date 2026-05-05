import { Text, View } from "react-native";
import { InputField } from "./InputField";
import { Button } from "./Button";
import { Link } from "expo-router";

export const SignUpUI = ({ form, update, onSubmit, loading, errors }: SignUpProps) => (
  <View className="gap-4">
    <View className="flex-row gap-3">
      <InputField
        placeholder="First name"
        value={form.firstName}
        onChangeText={update("firstName")}
        containerClassName="flex-1"
      />
      <InputField
        placeholder="Last name"
        value={form.lastName}
        onChangeText={update("lastName")}
        containerClassName="flex-1"
      />
    </View>

    <InputField
      placeholder="Email Address"
      value={form.email}
      onChangeText={update("email")}
      error={errors?.fields?.emailAddress?.message}
    />

    <InputField
      placeholder="Password"
      value={form.password}
      onChangeText={update("password")}
      secureTextEntry
      error={errors?.fields?.password?.message}
    />

    <Button text="Sign Up" onPress={onSubmit} loading={loading} />

    <View className="flex-row justify-center">
      <Text className="text-gray-500">Already have an account? </Text>
      <Link href="/sign-in">
        <Text className="text-blue-600 font-semibold">Sign In</Text>
      </Link>
    </View>

    <View nativeID="clerk-captcha" />
  </View>
);
