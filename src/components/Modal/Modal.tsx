import React from 'react';

import './styles.css';

interface IProps {
  title: string;
  setShowModal: (show: boolean) => void;
  handleOnClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
}

const Modal: React.FC<IProps> = ({ title, setShowModal, children, handleOnClick }) => {
  return (
    <div className={`modal fade show`} tabIndex={-1} aria-modal="true" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setShowModal(false)}
            ></button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button type="button" onClick={handleOnClick} className="btn btn-primary">
              <i className="bi bi-send"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
