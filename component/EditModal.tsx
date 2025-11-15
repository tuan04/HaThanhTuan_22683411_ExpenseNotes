import { Expenses } from "@/type/types";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

type AddModalProps = {
  onClose: () => void;
  onSubmit: (title: string, amount: number, category: string) => void;
  expense?: Expenses | null;
};

export default function EditModal({ onClose, onSubmit, expense }: AddModalProps) {
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");

  // Fill dữ liệu nếu đang edit
  useEffect(() => {
    if (expense) {
      setTitle(expense.title);
      setAmount(expense.amount);
      setCategory(expense.category || "");
    } else {
      // Reset khi thêm mới
      setTitle("");
      setAmount(0);
      setCategory("");
    }
  }, [expense]);

  const onSubmitHandle = () => {
    if (title.trim() === "") {
      Alert.alert("Hãy nhập title");
      return;
    }

    if (!amount || amount <= 0) {
      Alert.alert("Amount phải lớn hơn 0");
      return;
    }

    onSubmit(title, amount, category);
  };

  return (
    <Modal transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <Text style={styles.title}>
                {expense ? "Cập nhật Expense" : "Thêm Expense"}
              </Text>

              {/* Title */}
              <View>
                <Text style={styles.label}>Title:</Text>
                <TextInput
                  value={title}
                  onChangeText={setTitle}
                  style={styles.input}
                  placeholder="Nhập tên khoản chi..."
                />
              </View>

              {/* Amount */}
              <View>
                <Text style={styles.label}>Amount:</Text>
                <TextInput
                  value={amount.toString()}
                  onChangeText={(value) =>
                    setAmount(Number.parseFloat(value) || 0)
                  }
                  style={styles.input}
                  placeholder="Nhập số tiền..."
                  keyboardType="numeric"
                />
              </View>

              {/* Category */}
              <View>
                <Text style={styles.label}>Category:</Text>
                <TextInput
                  value={category}
                  onChangeText={setCategory}
                  style={styles.input}
                  placeholder="Nhập loại..."
                />
              </View>

              {/* Buttons */}
              <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={onClose}>
                  <Text style={styles.buttonText}>Hủy</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.addButton]}
                  onPress={onSubmitHandle}
                >
                  <Text style={[styles.buttonText, styles.addButtonText]}>
                    {expense ? "Cập nhật" : "Thêm"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    gap: 15,
    width: "80%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#ccc",
    padding: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#ccc",
  },
  addButton: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#000",
  },
  addButtonText: {
    color: "#fff",
  },
});
