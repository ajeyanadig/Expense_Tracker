import Expenses from "./components/Expenses";
import PiChart from "./components/PiChart";
import RecentTransactions from "./components/RecentTransactions";
import TopExpenses from "./components/TopExpenses";
import Wallet from "./components/Wallet";
import "./App.css";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useSnackbar } from "notistack";

ReactModal.setAppElement("#root");

function App() {
  const { enqueueSnackbar } = useSnackbar();

  let [transData, setTransData] = useState([
    {
      id: Date.now() + Math.trunc(Math.random() * 100),
      name: "Samosa",
      category: "Food",
      date: "2025-03-15",
      price: 150,
    },
    {
      id: Date.now() + Math.trunc(Math.random() * 100),
      name: "Movie",
      category: "Entertainment",
      date: "2025-03-15",
      price: 300,
    },
    {
      id: Date.now() + Math.trunc(Math.random() * 100),
      name: "Auto",
      category: "Travel",
      date: "2025-03-15",
      price: 50,
    },
  ]);

  let expenses = transData.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);
  let [wallet, setWallet] = useState(5000 - expenses);
  let [open1, setOpen1] = useState(false);
  let [open2, setOpen2] = useState(false);
  let [open3, setOpen3] = useState(false);
  let [editId, setEditId] = useState(0);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("transData"));
    if (Array.isArray(storedData)) {
      setTransData(storedData);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("transData", JSON.stringify(transData));
  }, [transData]);
  useEffect(() => {
    let expenses = transData.reduce((acc, curr) => {
      return acc + curr.price;
    }, 0);
    if (expenses <= wallet) {
      setWallet(5000 - expenses);
    } else
      enqueueSnackbar("Insufficient funds for transaction", {
        variant: "warning",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenses]);

  const handleCloseIncome = () => {
    setOpen1(false);
  };
  const handleOpenIncome = () => {
    setOpen1(true);
  };
  function handleAddIncome() {
    handleOpenIncome();
  }

  function handleIncomeAddition(e) {
    e.preventDefault();
    let ipmoney = Number(e.target[0].value);
    setWallet((c) => c + ipmoney);
    handleCloseIncome();
    enqueueSnackbar("Income added", {
      variant: "success",
    });
  }

  const handleCloseExpense = () => {
    setOpen2(false);
  };
  const handleOpenExpense = () => {
    setOpen2(true);
  };
  function handleAddExpense() {
    handleOpenExpense();
  }
  function handleExpenseAddition(e) {
    if (Number(e.target[1].value > wallet)) return;
    e.preventDefault();
    console.log(e);
    let [day, month, year] = e.target[3].value.split("/");
    let dateStr = `${year}-${month}-${day}`;
    let expenseObj = {
      id: Date.now() + Math.trunc(Math.random() * 100),
      name: e.target[0].value,
      price: Number(e.target[1].value),
      category: e.target[2].value,
      date: dateStr,
    };
    handleCloseExpense();
    setTransData([...transData, expenseObj]);

    enqueueSnackbar("Expense added", {
      variant: "success",
    });
  }

  const handleOpenEditExpense = () => {
    setOpen3(true);
  };
  const handleCloseEditExpense = () => {
    setOpen3(false);
  };
  function handleEditExpense(id) {
    handleOpenEditExpense();
    setEditId(id);
  }
  function editTransaction(e) {
    e.preventDefault();

    let [day, month, year] = e.target[3].value.split("/");
    let dateStr = `${year}-${month}-${day}`;
    let newObj = {
      name: e.target[0].value,
      price: Number(e.target[1].value),
      category: e.target[2].value,
      date: dateStr,
    };

    let newTransdata = transData.map((curr) => {
      if (curr.id === editId) {
        curr = { ...curr, ...newObj };
        return curr;
      }
      return curr;
    });
    setTransData(newTransdata);
    enqueueSnackbar("Expense Edited", {
      variant: "success",
    });
    console.log(transData);
  }
  // localStorage.setItem("transData", JSON.stringify(transData));

  return (
    <div className="fullApp">
      <ReactModal
        isOpen={open1}
        contentLabel="minimal modal example"
        style={{
          content: {
            width: "540px",
            height: "164px",
            margin: "auto",
            borderRadius: "10px",
            backgroundColor: "#EFEFEF",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Add Balance</h2>
        <form onSubmit={handleIncomeAddition}>
          <input
            required
            type="number"
            placeholder="Income Amount"
            style={{
              width: "217px",
              height: "40px",
              borderRadius: "15px",
              border: "none",
              boxShadow: "5px 5px 10px 0px grey",
              marginRight: "10px",
            }}
          />
          <button
            type="submit"
            style={{
              cursor: "pointer",
              width: "145px",
              height: "40px",
              borderRadius: "15px",
              backgroundColor: "#f4bb4a",
              color: "#ffffff",
              fontWeight: 800,
              border: "none",
              boxShadow: "5px 5px 10px 0px grey",
              marginRight: "10px",
            }}
          >
            Add Balance
          </button>
          <button
            onClick={handleCloseIncome}
            style={{
              cursor: "pointer",
              width: "145px",
              height: "40px",
              borderRadius: "15px",
              backgroundColor: "#d9d9d9d9",
              color: "black",
              fontWeight: 800,
              border: "none",
              boxShadow: "5px 5px 10px 0px grey",
            }}
          >
            Cancel
          </button>
        </form>
      </ReactModal>
      {/* ----- */}
      <ReactModal
        isOpen={open2}
        contentLabel="expense"
        style={{
          content: {
            width: "540px",
            height: "335px",
            margin: "auto",
            borderRadius: "10px",
            backgroundColor: "#EFEFEF",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Add Expenses</h2>
        <form onSubmit={(e) => handleExpenseAddition(e)}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <input
              name="title"
              required
              placeholder="  Title"
              style={{
                width: "217px",
                height: "40px",
                borderRadius: "15px",
                border: "none",
                boxShadow: "5px 5px 10px 0px grey",
                marginRight: "10px",
                justifySelf: "center",
              }}
            />
            <input
              name="price"
              required
              placeholder="  Price"
              style={{
                width: "217px",
                height: "40px",
                borderRadius: "15px",
                border: "none",
                boxShadow: "5px 5px 10px 0px grey",
                marginRight: "10px",
                justifySelf: "center",
              }}
            />
            <select
              name="category"
              required
              placeholder="  Select Category"
              style={{
                width: "217px",
                height: "40px",
                borderRadius: "15px",
                border: "none",
                boxShadow: "5px 5px 10px 0px grey",
                marginRight: "10px",
                justifySelf: "center",
              }}
            >
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Entertainment">Entertainment</option>
            </select>
            <input
              name="date"
              required
              placeholder="  dd/mm/yyy"
              style={{
                width: "217px",
                height: "40px",
                borderRadius: "15px",
                border: "none",
                boxShadow: "5px 5px 10px 0px grey",
                marginRight: "10px",
                justifySelf: "center",
              }}
            />
            <button
              type="submit"
              style={{
                cursor: "pointer",
                width: "217px",
                height: "40px",
                borderRadius: "15px",
                backgroundColor: "#f4bb4a",
                color: "#ffffff",
                fontWeight: 800,
                border: "none",
                boxShadow: "5px 5px 10px 0px grey",
                marginRight: "10px",
                justifySelf: "center",
              }}
            >
              Add Expense
            </button>
            <button
              onClick={handleCloseExpense}
              style={{
                cursor: "pointer",
                width: "145px",
                height: "40px",
                borderRadius: "15px",
                backgroundColor: "#d9d9d9d9",
                color: "black",
                fontWeight: 800,
                border: "none",
                boxShadow: "5px 5px 10px 0px grey",
                justifySelf: "center",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </ReactModal>
      <ReactModal
        isOpen={open3}
        contentLabel="edit expense"
        style={{
          content: {
            width: "540px",
            height: "335px",
            margin: "auto",
            borderRadius: "10px",
            backgroundColor: "#EFEFEF",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Add Expenses</h2>
        <form
          onSubmit={(e) => {
            editTransaction(e);
            handleCloseEditExpense();
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <input
              required
              placeholder="  Title"
              style={{
                width: "217px",
                height: "40px",
                borderRadius: "15px",
                border: "none",
                boxShadow: "5px 5px 10px 0px grey",
                marginRight: "10px",
                justifySelf: "center",
              }}
            />
            <input
              required
              placeholder="  Price"
              style={{
                width: "217px",
                height: "40px",
                borderRadius: "15px",
                border: "none",
                boxShadow: "5px 5px 10px 0px grey",
                marginRight: "10px",
                justifySelf: "center",
              }}
            />
            <select
              required
              placeholder="  Select Category"
              style={{
                width: "217px",
                height: "40px",
                borderRadius: "15px",
                border: "none",
                boxShadow: "5px 5px 10px 0px grey",
                marginRight: "10px",
                justifySelf: "center",
              }}
            >
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Entertainment">Entertainment</option>
            </select>
            <input
              required
              placeholder="  dd/mm/yyy"
              style={{
                width: "217px",
                height: "40px",
                borderRadius: "15px",
                border: "none",
                boxShadow: "5px 5px 10px 0px grey",
                marginRight: "10px",
                justifySelf: "center",
              }}
            />
            <button
              type="submit"
              style={{
                cursor: "pointer",
                width: "217px",
                height: "40px",
                borderRadius: "15px",
                backgroundColor: "#f4bb4a",
                color: "#ffffff",
                fontWeight: 800,
                border: "none",
                boxShadow: "5px 5px 10px 0px grey",
                marginRight: "10px",
                justifySelf: "center",
              }}
            >
              Add Expense
            </button>
            <button
              onClick={handleCloseEditExpense}
              style={{
                cursor: "pointer",
                width: "145px",
                height: "40px",
                borderRadius: "15px",
                backgroundColor: "#d9d9d9d9",
                color: "black",
                fontWeight: 800,
                border: "none",
                boxShadow: "5px 5px 10px 0px grey",
                justifySelf: "center",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </ReactModal>

      <h1>Expense Tracker</h1>
      <div className="totals">
        <Wallet value={wallet} handleAddIncome={handleAddIncome} />
        <Expenses value={expenses} handleAddExpense={handleAddExpense} />
        <PiChart transData={transData} />
      </div>
      <h2>
        <em>Recent Transaction</em>
      </h2>
      <div className="mygrid">
        <RecentTransactions
          transData={transData}
          setTransData={setTransData}
          handleEditExpense={handleEditExpense}
          editTransaction={editTransaction}
        />
        <TopExpenses transData={transData} />
      </div>
    </div>
  );
}

export default App;
