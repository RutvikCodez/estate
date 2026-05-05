import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { screens } from "@/constants";

export default function TabLayout() {
  return (
    <Tabs>
      {screens.map((screen) => (
        <Tabs.Screen
          key={screen.name}
          name={screen.name}
          options={{
            title: screen.title,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={screen.icon} size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
      ))}
    </Tabs>
  );
}