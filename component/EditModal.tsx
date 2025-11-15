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
  expense?: Expenses;
};

export default function EditModal({
  onClose,
  onSubmit,
  expense,
}: AddModalProps) {
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    if (expense) {
      setTitle(expense.title);
    }
  }, [expense]);

  const onSubmitHandle = () => {
    if (title === "") {
      Alert.alert("Hãy nhập title");
    } else if (amount <= 0 || amount == null) {
      Alert.alert("Amount phải lớn hơn 0");
    } else {
      onSubmit(title, amount, category);
    }
  };

  return (
    <Modal transparent={true} animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <Text style={styles.title}>Add Expense</Text>
              {/* Các input hoặc nội dung thêm Todo */}
              <View>
                <Text style={{ fontSize: 18 }}>Title:</Text>
                <TextInput
                  onChangeText={(value) => setTitle(value)}
                  style={styles.input}
                  placeholder="Nhập tên khoản chi....."
                ></TextInput>
              </View>
              <View>
                <Text style={{ fontSize: 18 }}>Amout:</Text>
                <TextInput
                  onChangeText={(value) => setAmount(Number.parseFloat(value))}
                  style={styles.input}
                  placeholder="Nhập số tiền....."
                ></TextInput>
              </View>
              <View>
                <Text style={{ fontSize: 18 }}>Category:</Text>
                <TextInput
                  onChangeText={(value) => setCategory(value)}
                  style={styles.input}
                  placeholder="Nhập loại....."
                ></TextInput>
              </View>

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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
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
    color: "#000",
    fontWeight: "bold",
  },
  addButtonText: {
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
  },
});
