// import AddModal from "@/component/AddModal";
import ExpensesItem from "@/component/ExpensesItem";
import { useExpenses } from "@/hooks/useExpenses";
import { Expenses } from "@/type/types";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { add, changePaidStatus, getAll, ready, remove } = useExpenses();
  const [todos, setTodos] = useState<Expenses[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchExpenses = async () => {
      const fetchedTodos = (await getAll()) as Expenses[];
      setTodos(fetchedTodos);
    };

    fetchExpenses();
  }, [getAll]);


  if (!ready) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Expense Notes</Text>
      </View>

      <View style={{ width: "100%" }}>
        {todos.length > 0 ? (
          <FlatList
            contentContainerStyle={{ gap: 10 }}
            data={todos}
            renderItem={({ item }) => (
              <ExpensesItem
                expenses={item}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
          />
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ fontSize: 15 }}>Chưa có khoản chi tiêu nào.</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  header: {
    marginBottom: 10,
    padding: 20,
    backgroundColor: "#682AEF",

    width: "100%",
  },
  headerTitle: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: 600,
    color: "white",
  },
  addBtn: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "white",
  },
});
