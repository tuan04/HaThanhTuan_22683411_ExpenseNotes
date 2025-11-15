// import AddModal from "@/component/AddModal";
import EditModal from "@/component/EditModal";
import ExpensesItem from "@/component/ExpensesItem";
import { useExpenses } from "@/hooks/useExpenses";
import { Expenses } from "@/type/types";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { add, changePaidStatus, getAll, ready, remove, update } =
    useExpenses();
  const [expenses, setExpenses] = useState<Expenses[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editingExpense, setEditingExpense] = useState<Expenses | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      const fetchExpenses = (await getAll()) as Expenses[];
      setExpenses(fetchExpenses);
    };

    fetchExpenses();
  }, [getAll]);

  const onOpenAddModal = () => {
    setEditingExpense(null);
    setShowAddModal(true);
  };

  const onOpenEditModal = (expense: Expenses) => {
    setEditingExpense(expense);
    setShowAddModal(true);
  };
  const onSubmit = async (title: string, amount: number, category: string) => {
    try {
      if (editingExpense) {
        // UPDATE
        await update(editingExpense.id, title, amount, category);
      } else {
        // ADD
        await add(title, amount, category);
      }

      setExpenses((await getAll()) as Expenses[]);
      setShowAddModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  const onUpdatePaid = async (id: number) => {
    try {
      await changePaidStatus(id);
      setExpenses((await getAll()) as Expenses[]);
    } catch (e) {
      console.log(e);
    }
  };

  if (!ready) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {showAddModal && (
        <EditModal
          onSubmit={onSubmit}
          onClose={() => setShowAddModal(false)}
          expense={editingExpense}
        />
      )}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Expense Notes</Text>
      </View>
      <View style={{ padding: 10 }}>
        <TouchableOpacity style={styles.addBtn} onPress={onOpenAddModal}>
          <Text style={styles.buttonText}>Thêm Expense</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%" }}>
        {expenses.length > 0 ? (
          <FlatList
            contentContainerStyle={{ gap: 10 }}
            data={expenses}
            renderItem={({ item }) => (
              <ExpensesItem
                expenses={item}
                onChangeStatusPaid={onUpdatePaid}
                onEdit={() => onOpenEditModal(item)}
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
