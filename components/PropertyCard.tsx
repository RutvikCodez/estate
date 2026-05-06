import { formatPrice } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function PropertyCard({
  property: {address, area_sqft, bathrooms, bedrooms, city, images, is_sold, price, title},
  onUnsave,
  showSave = false,
}: PropertyCardProps) {
  const iconsData = [
    {
      name: "bed-outline",
      value: bedrooms,
      subtitle: "bd",
    },
    {
      name: "expand-outline",
      value: area_sqft,
      subtitle: "ft²",
    },
  ];
  const router = useRouter();
  return (
    <TouchableOpacity
    onPress={() => router.push(`/(root)/property/${property.id}`)}
      className="flex-row bg-white rounded-2xl overflow-hidden"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
        opacity: is_sold ? 0.5 : 1,
      }}
    >
      <Image
        source={{ uri: images[0] }}
        className="w-28 h-28"
        resizeMode="cover"
      />

      <View className="flex-1 p-3 justify-between">
        <View className="flex-col gap-1">
          <Text className="text-sm font-bold text-gray-800">{title}</Text>
          <View className="flex-row items-center gap-1">
            <Ionicons name="location-outline" size={13} color={"#6B7280"} />

            <Text className="text-xs text-gray-500" numberOfLines={1}>
              {city}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-bold text-blue-600">
            {formatPrice(price)}
          </Text>
          {is_sold && (
            <View className="bg-red-50 px-2 py-0.5 rounded-full">
              <Text className="text-red-500 text-xs font-semibold">Sold</Text>
            </View>
          )}
          <View className="flex-row gap-3">
            {iconsData.map(({ name, value, subtitle }, index) => (
              <View key={index} className="flex-row items-center gap-1">
                <Ionicons
                  name={name as React.ComponentProps<typeof Ionicons>["name"]}
                  size={11}
                  color={"#6B7280"}
                />
                <Text className="text-xs text-gray-500">
                  {value} {subtitle}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
       {/* {showSave && (
        <TouchableOpacity
          onPress={toggleSave}
          disabled={saveLoading}
          className="w-10 items-center pt-3"
        >
          <Ionicons
            name={isSaved ? "heart" : "heart-outline"}
            size={18}
            color={isSaved ? "#EF4444" : "#9CA3AF"}
          />
        </TouchableOpacity>
      )} */}
    </TouchableOpacity>
  );
}
