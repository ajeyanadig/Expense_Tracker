function Wallet({ value, handleAddIncome }) {
  return (
    <div className="card">
      <p>Wallet Balance: {value}</p>
      <p
        className="addIncome"
        onClick={handleAddIncome}
        style={{ cursor: "pointer" }}
      >
        +Add Income
      </p>
    </div>
  );
}

export default Wallet;
