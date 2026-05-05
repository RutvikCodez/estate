import { View } from "react-native";
import { InputField } from "./InputField";
import { Button } from "./Button";
import { TextBtn } from "./TextBtn";

export const VerifyUI = ({
  form,
  update,
  onVerify,
  resend,
  reset,
  loading,
  error,
}: VerifyProps) => (
  <View className="gap-4">
    <InputField
      placeholder="Enter verification code"
      value={form.code}
      onChangeText={update("code")}
      keyboardType="number-pad"
      error={error}
    />

    <Button text="Verify" onPress={onVerify} loading={loading} />

    <TextBtn text="I need a new code" onPress={resend} />
    <TextBtn text="Start over" onPress={reset} />
  </View>
);
