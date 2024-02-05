import React, { useState } from "react";
import "../App.css";

const Header = () => {
  const [description, setDescription] = useState("");
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [balance, setBalance] = useState(0);
  const [expenseClicked, setExpenseClicked] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const handleInputChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleInputChangeAmount = (e) => {
    const input=e.target.value;

    if(/^\d*\.?\d*$/.test(input) || input === ""){
      setAmount(input)
    }
  };

  const handleTypeChange = (e) => {
    const selecttype = e.target.value;

    if (selecttype !== type) {
      setType(selecttype);
      setExpenseClicked(selecttype === "expenses");
    }
  };

  const handleAddTransaction = () => {
    const transactionAmount = parseFloat(amount);

    if (isNaN(transactionAmount) || transactionAmount <= 0) {
      alert("Plese enter a valid positive number for the amount");
      return;
    }

    if (type === "income") {
      setIncome(income + transactionAmount);
    } else {
      setExpenses(expenses + transactionAmount);
    }

    setBalance(
      balance + (type === "income" ? transactionAmount : -transactionAmount)
    );

    const newTransaction = {
      id: transactions.length + 1,
      description:description.charAt(0).toUpperCase()+ description.slice(1),
      amount,
      type,
    };
    setTransactions([...transactions, newTransaction]);

    setAmount("");
    setDescription("");
  };

  return (
    <div className="main">
      <form action="#">
        <h1>Welcome, To the Expense Calculator</h1>
        <h2>Your Balance</h2>
        <p>{balance}</p>
        <div>
          <h2 className="income">Income</h2>
          <p className="income">{income}</p>
          <h2 className="expense">Expense</h2>
          <p className="expense">{expenses}</p>
        </div>
        <div className="input-from-user">
          <input
            type="text"
            placeholder="Description"
            onChange={handleInputChangeDescription}
            value={description}
          />
          <input
            type="text"
            placeholder="Amount"
            onChange={handleInputChangeAmount}
            value={amount}
          />
          <br />
          <label>
            <input
              type="radio"
              value="expenses"
              checked={type === "expenses"}
              onChange={handleTypeChange}
            />
            Expense
            <input
              type="radio"
              value="income"
              checked={type === "income"}
              onChange={handleTypeChange}
            />
            Income
            <button onClick={handleAddTransaction}>Add</button>
            <h2>The expense and income list are:</h2>
            <ul className="transaction-list">
              {transactions.map((transation) => (
                <li key={transation.id} className="transaction-list-element">
                  <p>{transation.description}:</p>

                  <small >{transation.amount} </small> 
                  <small style={{color: transation.type=== 'income' ? "green" : "red"}}>
                    {transation.type === "income" ? "Income" : "Expenses"}
                  </small>
                </li>
              ))}
            </ul>
          </label>
        </div>
      </form>
    </div>
  );
};

export default Header;
