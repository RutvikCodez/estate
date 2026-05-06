import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { screens } from "@/constants";
import { useUserStore } from "@/store/userStore";

export default function TabLayout() {
  const isAdmin = useUserStore((state) => state.isAdmin);
  const updatedScreens = isAdmin
    ? [
        ...screens.slice(0, 2),
        { name: "create", title: "Add Property", icon: "add-circle" },
        ...screens.slice(2),
      ]
    : screens;
  return (
    <Tabs>
      {updatedScreens.map((screen) => (
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
