import React, { useState } from "react";
import { useFilter } from "../hooks/useFilter";
import ContextMenu from "./ContextMenu";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function Table({
  expenses,
  setExpenses,
  setRecord,
  setIsEditingRow,
}) {
  // const [query, setQuery] = useState("");
  // const [total, setTotal] = useState(0);
  const [filteredData, setQuery, query] = useFilter(
    expenses,
    (data) => data.category
  );
  const total = filteredData.reduce((acc, data) => acc + +data.amount, 0);
  const [menuPostion, setMenuPosition] = useLocalStorage("menuPostion", {});
  const [rowId, setRowId] = useState("");

  const [sortTable, setSortTable] = useState(() => () => {});
  // console.log(sortTable);

  const handleOnIncrease = () => {
    setExpenses((prevState) => [
      ...prevState.sort((a, b) => {
        if (a.amount > b.amount) return 1;
        else if (a.amount < b.amount) return -1;
        return 0;
      }),
    ]);
  };
  const handleOnDecrease = () => {
    setExpenses((prevState) => [
      ...prevState.sort((a, b) => {
        if (a.amount < b.amount) return 1;
        else if (a.amount > b.amount) return -1;
        return 0;
      }),
    ]);
  };

  return (
    <>
      <ContextMenu
        menuPosition={menuPostion}
        setMenuPostion={setMenuPosition}
        setExpenses={setExpenses}
        rowId={rowId}
        expenses={expenses}
        setRecord={setRecord}
        setIsEditingRow={setIsEditingRow}
      ></ContextMenu>
      <table
        className="expense-table"
        onClick={() => {
          if (menuPostion.left) setMenuPosition({});
        }}
      >
        <thead>
          <tr>
            <th className="amount-column">
              <div>
                <span>Title</span>
                <svg
                  onClick={() =>
                    setSortTable(() => (a, b) => a.title.localeCompare(b.title))
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  onClick={() =>
                    setSortTable(() => (a, b) => b.title.localeCompare(a.title))
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </div>
            </th>
            <th>
              <select
                // value={query}
                onChange={(e) => setQuery(e.target.value)}
              >
                <option value={query} hidden>
                  {query ? query : "All"}
                </option>
                <option value="">{"All"}</option>
                <option value="Grocery">Grocery</option>
                <option value="Clothes">Clothes</option>
                <option value="Bills">Bills</option>
                <option value="Education">Education</option>
                <option value="Medicine">Medicine</option>
              </select>
            </th>
            <th className="amount-column">
              <div>
                <span>Amount</span>
                <svg
                  onClick={() =>
                    setSortTable((prevState) => (a, b) => a.amount - b.amount)
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  onClick={() =>
                    setSortTable(() => (a, b) => b.amount - a.amount)
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData &&
            filteredData
              .sort(sortTable)
              .map(({ id, title, category, amount }) => {
                return (
                  <tr
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setRowId(id);
                      setMenuPosition({
                        left: e.clientX + 5,
                        top: e.clientY + 5,
                      });
                    }}
                    key={id}
                  >
                    <td>{title}</td>
                    <td>{category}</td>
                    <td>₹{amount}</td>
                  </tr>
                );
              })}
          <tr>
            <th>Total</th>
            <th className="clear-sort" onClick={() => setSortTable(() => {})}>
              Clear sort
            </th>
            <th>₹{total}</th>
          </tr>
        </tbody>
      </table>
    </>

    // <table border={1}>
    //   <thead>
    //     <tr>
    //       <th>Title</th>
    //       <th>
    //         <select id="category">
    //           <option>All</option>
    //           <option>Grocery</option>
    //           <option>Clothes</option>
    //           <option>Bills</option>
    //           <option>Medicine</option>
    //         </select>
    //       </th>
    //       <th>Amount</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {expenses.map(({ title, category, amount }) => {
    //       return (
    //         <tr key={crypto.randomUUID()}>
    //           <td>{title}</td>
    //           <td>{category}</td>
    //           <td>{amount}</td>
    //         </tr>
    //       );
    //     })}
    // <tr>
    //   <td>Total</td>
    //   <td></td>
    //   <td>{total}</td>
    // </tr>
    //   </tbody>
    // </table>
  );
}
