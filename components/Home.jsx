import React, { useState } from "react";
import Form from "./Form";
import Table from "./Table";
import sampleData from "../sampleData";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function Home() {
  const [expenses, setExpenses] = useLocalStorage("expenses", sampleData);
  const [record, setRecord] = useLocalStorage("record", {
    title: "",
    category: "",
    amount: "",
  });
  const [isEditingRow, setIsEditingRow] = useLocalStorage("isEditingRow", "");

  return (
    <main>
      <h1>Track your expenses</h1>
      <div className="expense-tracker">
        <Form
          setExpenses={setExpenses}
          record={record}
          setRecord={setRecord}
          isEditingRow={isEditingRow}
          setIsEditingRow={setIsEditingRow}
        />
        <Table
          expenses={expenses}
          setExpenses={setExpenses}
          setRecord={setRecord}
          setIsEditingRow={setIsEditingRow}
        />
      </div>
    </main>
  );
}
