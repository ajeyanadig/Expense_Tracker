function Expenses({ value, handleAddExpense }) {
  return (
    <div className="card">
      <p>Expenses: {value}</p>
      <button
        style={{ cursor: "pointer" }}
        onClick={handleAddExpense}
        className="addExpense"
      >
        +Add Expense
      </button>
    </div>
  );
}

export default Expenses;
