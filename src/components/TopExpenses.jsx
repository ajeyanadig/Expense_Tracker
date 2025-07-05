import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";

function TopExpenses({ transData }) {
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

  const tData = [
    { category: "Food", price: totalFoodPrice },
    { category: "Entertainment", price: totalEntertPrice },
    { category: "Travel", price: totalTravelPrice },
  ];

  return (
    <div
      style={{
        height: "345px",
        width: "100%",
        backgroundColor: "white",
        color: "black",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={tData}
          margin={{ top: 20, right: 20, bottom: 20, left: 70 }}
          style={{ width: "80%" }}
        >
          <XAxis hide type="number" />
          <YAxis type="category" dataKey="category" />
          <Bar
            dataKey="price"
            fill="#8884d8"
            radius={[0, 30, 30, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TopExpenses;
