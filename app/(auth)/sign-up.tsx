import {
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useAuth, useSignUp } from "@clerk/expo";
import { useRouter } from "expo-router";
import { Header } from "@/components/Header";
import { VerifyUI } from "@/components/VerifyUI";
import { SignUpUI } from "@/components/SignUpUI";

export default function SignUp() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    code: "",
  });

  const isLoading = fetchStatus === "fetching";
  const update = (k: keyof FormState) => (v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const onSignUp = async () => {
    const { error } = await signUp.password({
      emailAddress: form.email,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
    });

    if (error) return alert(error.message);
    await signUp.verifications.sendEmailCode();
  };

  const onVerify = async () => {
    await signUp.verifications.verifyEmailCode({ code: form.code });

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (!session.currentTask) {
            router.replace(decorateUrl("/") as any);
          }
        },
      });
    }
  };

  if (signUp.status === "complete" || isSignedIn) return null;

  const isVerifyScreen =
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    !signUp.missingFields.length;

    return (
    <ScrollView className="bg-white" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 justify-center px-6 py-12 gap-8">
        <Header
          title={isVerifyScreen ? "Verify your account" : "Create Account"}
          subtitle={
            isVerifyScreen
              ? `We sent a code to ${form.email}`
              : "Find your dream home today"
          }
        />

        {isVerifyScreen ? (
          <VerifyUI
            form={form}
            update={update}
            onVerify={onVerify}
            resend={() => signUp.verifications.sendEmailCode()}
            reset={() => signUp.reset()}
            loading={isLoading}
            error={errors?.fields?.code?.message}
          />
        ) : (
          <SignUpUI
            form={form}
            update={update}
            onSubmit={onSignUp}
            loading={isLoading}
            errors={errors}
          />
        )}
      </View>
    </ScrollView>
  );
}