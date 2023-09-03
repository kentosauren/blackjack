type ButtonUpProps = {
  onIncrement: (isUp: boolean) => void;
  isUp: boolean;
};

function ButtonUp({ onIncrement, isUp }: ButtonUpProps) {
  let buttonColor = isUp ? "btn btn-success" : "btn btn-danger";
  return (
    <button
      type="button"
      className={buttonColor}
      onClick={() => onIncrement(isUp)}
    >
      {isUp ? "UP" : "DOWN"}
    </button>
  );
}

export default ButtonUp;
