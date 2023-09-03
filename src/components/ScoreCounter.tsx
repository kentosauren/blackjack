type ScoreCounterProps = {
  counter: number;
};

function ScoreCounter({ counter }: ScoreCounterProps) {
  return (
    <div
      style={{
        border: "1px solid black",
        backgroundColor: "lightgrey",
        color: "orange",
        fontSize: "60px",
        fontWeight: "bold",
      }}
    >
      Score: {counter}
    </div>
  );
}

export default ScoreCounter;
