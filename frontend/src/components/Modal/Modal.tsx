import "./Modal.css";

interface ModalComponentProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalComponent = ({ title, onClose, children }: ModalComponentProps) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" aria-modal="true" aria-labelledby="modal-title" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            X
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default ModalComponent;
