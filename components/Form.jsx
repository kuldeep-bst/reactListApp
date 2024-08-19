import React, { useRef, useState } from "react";
import Textfield from "./Textfield";
import SelectField from "./SelectField";

export default function Form({
  setExpenses,
  record,
  setRecord,
  isEditingRow,
  setIsEditingRow,
}) {
  // let title = useRef("");
  // let category = useRef("");
  // let amount = useRef("");

  const [error, setError] = useState({});

  const validationConfig = {
    title: [
      { required: true, message: "Title is requred!" },
      { minLen: 5, message: "Lenght should be at least 5!" },
    ],
    category: [{ required: true, message: "Select a category!" }],
    amount: [
      { required: true, message: "Amount is requred!" },
      { notNum: true, message: "enter valid amount" },
    ],
  };

  const validate = (record) => {
    const errorData = {};
    Object.entries(record).some(([key, val]) => {
      validationConfig[key].forEach((rule) => {
        if (rule.required && !val) {
          errorData[key] = rule.message;
          return true;
        }
        if (rule.minLen && val.length < 3) {
          errorData[key] = rule.message;
          return true;
        }
        if (rule.notNum && isNaN(val)) {
          errorData[key] = rule.message;
          return true;
        }
      });
    });
    setError(errorData);
    return errorData;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const validateRes = validate(record);
    if (Object.keys(validateRes).length) return;

    isEditingRow
      ? setExpenses((lastState) => {
          return lastState.map((rec) => {
            if (rec.id === isEditingRow) {
              return { ...record, id: [isEditingRow] };
            }
            return rec;
          });
        })
      : setExpenses((lastState) =>
          lastState
            ? [...lastState, { ...record, id: crypto.randomUUID() }]
            : [{ ...record, id: crypto.randomUUID() }]
        );
    // setExpenses([record]);
    // setTotal((prevState) => +prevState + +record.amount);
    // e.target.reset();
    setRecord({ title: "", category: "", amount: "" });
    setIsEditingRow("");
  };

  const handleOnChange = (e) => {
    setRecord((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setError({});
  };

  // function handleOnSubmit(e) {
  //   e.preventDefault();
  //   setExpenses((lastState) => [
  //     ...lastState,
  //     {
  //       title: title.current,
  //       category: category.current,
  //       amount: amount.current,
  //     },
  //   ]);
  //   setTotal((prevState) => +prevState + +amount.current);
  //   e.target.reset();
  // }

  // function getFormData(form) {
  //   const data = new FormData(form);
  //   const record = {};
  //   for (const [key, val] of data.entries()) record[key] = val;
  //   return record;
  // }

  return (
    <form className="expense-form" onSubmit={handleOnSubmit}>
      <Textfield
        label="Title"
        name="title"
        id="title"
        onChange={handleOnChange}
        value={record.title}
        error={error.title}
      />
      <SelectField
        label="Category"
        name="category"
        id="category"
        onChange={handleOnChange}
        value={record.category}
        error={error.category}
        defaultOption="Select Category"
        options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
      />
      {/* <div className="input-container">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={record.category}
          onChange={handleOnChange}
        >
          <option value="" hidden>
            Select Category
          </option>
          <option value="Grocery">Grocery</option>
          <option value="Clothes">Clothes</option>
          <option value="Bills">Bills</option>
          <option value="Education">Education</option>
          <option value="Medicine">Medicine</option>
        </select>
        <p className="error">{error.categoryError}</p>
      </div> */}
      <Textfield
        label="Amount"
        name="amount"
        id="amount"
        onChange={handleOnChange}
        value={record.amount}
        error={error.amount}
      />
      <button className="add-btn">{isEditingRow ? "Save" : "Add"}</button>
    </form>

    // <div>
    //   <form onSubmit={handleOnSubmit}>
    //     <label htmlFor="title">Title</label>
    //     <br />
    //     <input
    //       id="title"
    //       name="title"
    //       value={record.title}
    //       onChange={handleOnChange}
    //       // onChange={(e) => (title.current = e.target.value)}
    //       type="text"
    //     ></input>
    //     <br />
    //     <p>{error.titleError}</p>
    //     <label htmlFor="category">Category</label>
    //     <br />
    //     <select
    //       name="category"
    //       value={record.category}
    //       onChange={handleOnChange}
    //       // onChange={(e) => (category.current = e.target.value)}
    //       id="category"
    //     >
    //       <option hidden>Select Category</option>
    //       <option>Grocery</option>
    //       <option>Clothes</option>
    //       <option>Bills</option>
    //       <option>Medicine</option>
    //     </select>
    //     <br />
    //     <p>{error.categoryError}</p>
    //     <label htmlFor="amount">Amount</label>
    //     <br />
    //     <input
    //       id="amount"
    //       value={record.amount}
    //       onChange={handleOnChange}
    //       // onChange={(e) => (amount.current = e.target.value)}
    //       name="amount"
    //       type="text"
    //     ></input>
    //     <br />
    //     <p>{error.amountError}</p>
    //     <button type="submit">Add</button>
    //   </form>
    // </div>
  );
}
