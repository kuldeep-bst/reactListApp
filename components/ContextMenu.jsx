import React from "react";
import { useFilter } from "../hooks/useFilter";

export default function ContextMenu({
  menuPosition,
  setMenuPostion,
  setExpenses,
  rowId,
  expenses,
  setRecord,
  setIsEditingRow,
}) {
  if (!menuPosition.left) return;
  return (
    <div className="context-menu" style={menuPosition}>
      <div
        onClick={() => {
          setMenuPostion({});
          const { title, category, amount } = expenses.find(
            (rec) => rec.id === rowId
          );
          setRecord({ title, category, amount });
          setIsEditingRow(rowId);
        }}
      >
        Edit
      </div>
      <div
        onClick={(e) => {
          setMenuPostion({});
          setExpenses((lastState) =>
            lastState.filter((data) => data.id != rowId)
          );
          setIsEditingRow("");
          setRecord({ title: "", category: "", amount: "" });
        }}
      >
        Delete
      </div>
    </div>
  );
}
