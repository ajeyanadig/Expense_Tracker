function Expenses({ value, handleAddExpense }) {
  return (
    <div className="card">
      <p>Expenses: {value}</p>
      <p
        style={{ cursor: "pointer" }}
        onClick={handleAddExpense}
        className="addExpense"
      >
        +Add Expense
      </p>
    </div>
  );
}

export default Expenses;
