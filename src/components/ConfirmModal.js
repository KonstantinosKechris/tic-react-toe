export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{message}</h2>
        <button onClick={onConfirm} className="confirm-btn">
          Yes
        </button>
        <button onClick={onCancel} className="cancel-btn">
          No
        </button>
      </div>
    </div>
  );
}
