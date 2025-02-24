import "./Modal.scss";

export default function Modal({ message, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{message}</h2>
        <button onClick={onClose}>Restart Game</button>
      </div>
    </div>
  );
}
