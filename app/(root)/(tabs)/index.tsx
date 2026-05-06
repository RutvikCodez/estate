import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/expo";
import { useFocusEffect, useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import FeatureCard from "@/components/FeatureCard";

export default function HomeScreen() {
  const { user } = useUser();
  const router = useRouter();
  const [featured, setFeatured] = useState<Property[]>([]);
  const [recommended, setRecommended] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProperties = async () => {
    setLoading(true);
    const { data: featuredData } = await supabase
      .from("properties")
      .select("*")
      .eq("is_featured", true)
      .order("created_at", { ascending: false });

    const { data: recommendedData } = await supabase
      .from("properties")
      .select("*")
      .eq("is_featured", false)
      .order("created_at", { ascending: false });

    setFeatured(featuredData || []);
    setRecommended(recommendedData || []);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchProperties();
    }, []),
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <FlatList
        data={recommended}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="flex-col gap-5 px-5">
            <View className="flex-row items-center justify-between">
              <Image
                source={require("../../../assets/images/kribb.png")}
                style={{ width: 90, height: 36 }}
                resizeMode="contain"
              />
              <View className="items-end">
                <Text>Good Morning </Text>
                <Text className="text-gray-900 text-base font-bold">
                  {user?.firstName || "User"}{" "}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => router.push("/(root)/(tabs)/search")}
              className="flex-row items-center bg-white rounded-2xl px-4 py-3 gap-3"
              style={{
                shadowColor: "#000",
                shadowOpacity: 0.06,
                shadowRadius: 6,
                elevation: 2,
                shadowOffset: { width: 0, height: 1 },
              }}
            >
              <Ionicons name="search-outline" size={18} color={"#9CA3AF"} />
              <Text className="text-gray-400 text-sm flex-1">
                Search properties, cities...
              </Text>
              <TouchableOpacity
                onPress={() =>
                  router.push("/(root)/(tabs)/search?openFilters=true")
                }
                className="p-2 bg-blue-600 rounded-xl items-center justify-center"
              >
                <Ionicons name="options-outline" size={15} color={"white"} />
              </TouchableOpacity>
            </TouchableOpacity>

            <View className="flex-col gap-4">
              <Text className="text-gray-900 text-lg font-bold">Featured</Text>
              {loading ? (
                <ActivityIndicator
                  size={"small"}
                  color={"#2563EB"}
                  className="py-10"
                />
              ) : (
                <FlatList
                  data={featured}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <FeatureCard {...item} />}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="flex-row gap-4"
                />
              )}
            </View>

            <Text className="text-gray-900 text-lg font-bold px-5 mb-4">
              Recommended
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className="px-5">
            <Text>{item.title}</Text>
          </View>
        )}
        ListEmptyComponent={
          !loading ? (
            <View className="items-center py-10">
              <Text className="text-gray-400">No properties found.</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}
