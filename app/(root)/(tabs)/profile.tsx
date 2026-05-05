import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/expo";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const router = useRouter();
  const { signOut } = useAuth();
  const handleSignOut = async () => {
    await signOut();
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
