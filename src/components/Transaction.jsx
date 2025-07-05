import { PiPizzaDuotone } from "react-icons/pi";
import { GiCancel } from "react-icons/gi";
import { CiEdit } from "react-icons/ci";
import { FiGift } from "react-icons/fi";
import { SlBag } from "react-icons/sl";

const months = [
  "January",
  "February",
  "March",
  "April",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function Transaction({
  id,
  name,
  dateStr,
  price,
  category,
  deleteTransaction,
  handleEditExpense,
}) {
  function buildDateString(dateStr) {
    let date = new Date(dateStr);
    let month = months[date.getMonth() - 1];
    let year = date.getFullYear();
    let day = date.getDate();

    let str = `${month} ${day}, ${year}`;
    return str;
  }

  let iconObj = {
    Food: <PiPizzaDuotone style={{ height: "30px", width: "30px" }} />,
    Entertainment: <FiGift style={{ height: "30px", width: "30px" }} />,
    Travel: <SlBag style={{ height: "30px", width: "30px" }} />,
  };

  return (
    <div className="transaction">
      <div className="left">
        <span>{iconObj[category]}</span>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>{name}</div>
          <div style={{ color: "gray" }}>{buildDateString(dateStr)}</div>
        </div>
      </div>
      <div className="right">
        <div style={{ color: "#F4BB4A", fontWeight: 700 }}>Rs.{price}</div>
        <div
          style={{
            backgroundColor: "red",
            height: "37px",
            width: "37px",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <GiCancel
            style={{
              backgroundColor: "red",
              color: "white",
              height: "20px",
              width: "20px",
            }}
            onClick={() => deleteTransaction(id)}
          />
        </div>
        <div
          style={{
            backgroundColor: "#F4BB4A",
            height: "37px",
            width: "37px",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CiEdit
            style={{
              backgroundColor: "#F4BB4A",
              color: "white",
              height: "20px",
              width: "20px",
            }}
            onClick={() => {
              handleEditExpense(id);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Transaction;
