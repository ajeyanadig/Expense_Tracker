function Pill({ name, color }) {
  return (
    <span>
      &nbsp;
      <span
        style={{
          backgroundColor: color,
          height: "8px",
          width: "36px",
          display: "inline-block",
        }}
      ></span>
      &nbsp;{name}
    </span>
  );
}

export default Pill;
