function Wallet({ value, handleAddIncome }) {
  return (
    <div className="card">
      <p>Wallet Balance: {value}</p>
      <button
        className="addIncome"
        onClick={handleAddIncome}
        style={{ cursor: "pointer" }}
      >
        + Add Income
      </button>
    </div>
  );
}

export default Wallet;
