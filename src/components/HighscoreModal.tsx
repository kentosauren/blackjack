type HighScoreModalProps = {
  counter: number;
  onClose: () => void;
};

const HighScoreModal: React.FC<HighScoreModalProps> = ({
  counter,
  onClose,
}) => {
  return (
    <div className="high-score-modal">
      <div className="modal-content">
        <h2>Congratulations!</h2>
        <p>You've got a new high score!</p>
        <p>{counter} points!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default HighScoreModal;
