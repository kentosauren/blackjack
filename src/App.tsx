import { useEffect, useState } from "react";
import "./App.css";
import ScoreCounter from "./components/ScoreCounter";
import ButtonUp from "./components/buttonUp";
import HighScoreModal from "./components/HighscoreModal";

function App() {
  const [counter, setCounter] = useState(0);
  const [randomNumber, setRandomNumber] = useState(1);
  const [oldRandomNumber, setOldRandomNumber] = useState(1);
  const [statusText, setStatusText] = useState("");
  const [showHighScoreModal, setShowHighScoreModal] = useState(false);

  useEffect(() => {
    // Adding key event listener
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case "ArrowUp": // Up arrow
          incrementCounter(true);
          break;
        case "ArrowDown":
          incrementCounter(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup: remove event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [randomNumber, oldRandomNumber]);

  const incrementCounter = (isUp: boolean) => {
    const newRandomNumber = generateRandomNumber();
    const currentRandomNumber = randomNumber; // Capture the current random number before updating the state
    const storedScore = localStorage.getItem("highscore")
      ? JSON.parse(localStorage.getItem("highscore") as string)
      : null;
    setStatusText("");

    if (
      (isUp && newRandomNumber >= currentRandomNumber) ||
      (!isUp && newRandomNumber <= currentRandomNumber)
    ) {
      setCounter((prevCounter) => prevCounter + 1);
    } else {
      setStatusText("You Lose");
      console.log("Setting high score " + counter);

      if (counter > storedScore) {
        setShowHighScoreModal(true);
        localStorage.setItem("highscore", JSON.stringify(counter));
      }
    }

    setOldRandomNumber(currentRandomNumber); // set oldRandomNumber with the current randomNumber
    setRandomNumber(newRandomNumber); // update randomNumber for the next round

    console.log(isUp, newRandomNumber, currentRandomNumber); // Log the variables
  };

  const generateRandomNumber = () => {
    const min = 1;
    const max = 21;
    const newRandomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return newRandomNumber;
  };
  return (
    <>
      {showHighScoreModal && (
        <HighScoreModal
          counter={counter}
          onClose={() => {
            setShowHighScoreModal(false);
            setCounter(0);
            setStatusText("");
          }}
        />
      )}
      <div className="container">
        <div className="side-image"></div>
        <div className="main-content">
          <div style={{ color: "red", fontSize: "120px" }}>{statusText}</div>
          <h3>{oldRandomNumber}</h3>
          <h1 style={{ color: "red", fontSize: "60px" }}>{randomNumber}</h1>
          <br></br>
          <ButtonUp
            onIncrement={(isUp) => incrementCounter(isUp)}
            isUp={true}
          />
          <ScoreCounter counter={counter} />
          <ButtonUp onIncrement={incrementCounter} isUp={false} />
        </div>
        <div className="side-image"></div>
      </div>
    </>
  );
}

export default App;
