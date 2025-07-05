import { Pie, PieChart } from "recharts";
import Pill from "./Pill";

function PiChart({ transData }) {
  let totalFoodPrice = transData.reduce((acc, curr) => {
    if (curr.category === "Food") return acc + curr.price;
    else return acc;
  }, 0);
  let totalEntertPrice = transData.reduce((acc, curr) => {
    if (curr.category === "Entertainment") return acc + curr.price;
    else return acc;
  }, 0);
  let totalTravelPrice = transData.reduce((acc, curr) => {
    if (curr.category === "Travel") return acc + curr.price;
    else return acc;
  }, 0);
  const data = [
    {
      name: "Entertainment",
      value: totalEntertPrice,
      fill: "#FF9304",
    },
    {
      name: "Food",
      value: totalFoodPrice,
      fill: "#A000FF",
    },
    {
      name: "Travel",
      value: totalTravelPrice,
      fill: "#FDE006",
    },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontSize: "13px",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <PieChart height={220} width={220}>
        <Pie dataKey="value" data={data} />
      </PieChart>
      <div className="pills">
        <Pill name="Entertainment" color="#FF9304" />
        <Pill name="Food" color="#A000FF" />
        <Pill name="Travel" color="#FDE006" />
      </div>
    </div>
  );
}

export default PiChart;
