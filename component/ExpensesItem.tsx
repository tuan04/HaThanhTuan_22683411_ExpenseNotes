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
      }}
    >
      <Text
        style={{
          fontSize: 15,
          textDecorationLine: expenses.paid === 1 ? "line-through" : "none",
        }}
      >
        {expenses.title} - {expenses.amount}
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
