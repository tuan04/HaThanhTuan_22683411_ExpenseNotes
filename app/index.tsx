import { useExpenses } from "@/hooks/useExpenses";
import { Text, View } from "react-native";

export default function Index() {
  const { add, changePaidStatus, getAll, ready, remove } = useExpenses();
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
