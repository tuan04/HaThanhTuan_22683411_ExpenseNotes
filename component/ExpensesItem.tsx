import { formatVND } from "@/helpers/formatCurrency";
import { Expenses } from "@/type/types";
import { EvilIcons, Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type ExpensesItemProps = {
  expenses: Expenses;
};

export default function ExpensesItem({
  expenses,
}: ExpensesItemProps) {

  return (
    <TouchableOpacity
      style={{
        width: "100%",
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        borderColor: expenses.paid === 1 ? "red" : "green"
      }}
    >
      <Text
        style={{
          fontSize: 15,
          textDecorationLine: expenses.paid === 1 ? "line-through" : "none",
        }}
      >
        {expenses.title} - {formatVND(expenses.amount)} - {expenses.category} - {expenses.paid === 0 ? "Đã trả" : "Chưa trả"}
      </Text>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <TouchableOpacity>
          <Feather name="edit" size={21} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <EvilIcons name="trash" size={26} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
