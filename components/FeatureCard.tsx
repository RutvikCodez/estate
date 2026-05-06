import { formatPrice } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function FeatureCard({
  address,
  area_sqft,
  bathrooms,
  bedrooms,
  city,
  created_at,
  description,
  id,
  images,
  is_featured,
  is_sold,
  latitude,
  longitude,
  price,
  title,
  type,
}: Property) {
  return (
    <TouchableOpacity
      className="bg-white rounded-3xl overflow-hidden mr-4"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
        opacity: is_sold ? 0.5 : 1,
      }}
    >
      <Image source={{ uri: images[0] }} className="w-full h-44" />
      <View className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full">
        <Text className="text-xs font-semibold text-blue-600 capitalize">
          {type}
        </Text>
      </View>
      {is_sold && (
        <View className="absolute top-3 right-3 bg-red-500 px-3 py-1 rounded-full">
          <Text className="text-white text-xs font-semibold">Sold</Text>
        </View>
      )}
      <View className="p-4">
        <Text
          className="text-base font-bold text-gray-800 mb-1"
          numberOfLines={1}
        >
          {title}
        </Text>
        <View className="flex-row items-center gap-1 mb-3">
          <Ionicons name="location-outline" size={13} color={"#6B7280"} />
          <Text className="text-xs text-gray-500" numberOfLines={1}>
            {address}, {city}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-blue-600 font-bold text-base">
            {formatPrice(price)}
          </Text>
          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center gap-1">
                <Ionicons name="bed-outline" size={13} color={"#6B7280"} />
                <Text className="text-xs text-gray-500">{bedrooms}</Text>
            </View>
            <View className="flex-row items-center gap-1">
                <Ionicons name="water-outline" size={13} color={"#6B7280"} />
                <Text className="text-xs text-gray-500">{bathrooms}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
