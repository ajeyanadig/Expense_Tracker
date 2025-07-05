import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Transaction from "./Transaction";
import { useState } from "react";
import { useSnackbar } from "notistack";
function RecentTransactions({ transData, setTransData, handleEditExpense }) {
  const { enqueueSnackbar } = useSnackbar();
  let [pageNumber, setPageNumber] = useState(0);

  let toShow = transData.slice(0 + pageNumber * 3, 3 + pageNumber * 3);
  let totalLength = transData.length;
  function leftSideHandler() {
    if (pageNumber === 0) return;
    setPageNumber(--pageNumber);
  }
  function rightSideHandler() {
    if (3 + pageNumber * 3 >= totalLength) return;
    setPageNumber(++pageNumber);
  }
  function deleteTransaction(id) {
    let transDataCopy = [...transData];
    transDataCopy = transDataCopy.filter((curr) => curr.id !== id);
    setTransData(transDataCopy);
    enqueueSnackbar("Transaction Deleted", {
      variant: "success",
    });
  }

  return (
    <>
      {toShow.length > 0 ? (
        <div className="recentTrans">
          {toShow.map((curr) => (
            <Transaction
              key={curr.id}
              id={curr.id}
              name={curr.name}
              dateStr={curr.date}
              price={curr.price}
              category={curr.category}
              deleteTransaction={deleteTransaction}
              handleEditExpense={handleEditExpense}
            />
          ))}
          <div className="directionButtons">
            <span
              style={{
                color: "black",
                height: "37px",
                width: "37px",
                backgroundColor: "#D9D9D9",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
              }}
              onClick={leftSideHandler}
            >
              {" "}
              <FaArrowLeft />
            </span>

            <span
              style={{
                color: "white",
                height: "37px",
                width: "37px",
                backgroundColor: "#43967B",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
              }}
            >
              {pageNumber + 1}
            </span>
            <span
              style={{
                color: "black",
                height: "37px",
                width: "37px",
                backgroundColor: "#D9D9D9",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
              }}
              onClick={rightSideHandler}
            >
              {" "}
              <FaArrowRight />
            </span>
          </div>
        </div>
      ) : (
        <div className="nothing">No Transactions !</div>
      )}
    </>
  );
}

export default RecentTransactions;
