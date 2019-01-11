import React from 'react';
import { oneOfType, arrayOf, node, func } from 'prop-types';
import { createPortal } from 'react-dom';

const Modal = (props) => {
  const { children, onClose } = props;

  return (
    createPortal(
      <div className="modal-background">
        <div className="modal">
          <div className="modal__header">
            <span className="modal__close" onClick={onClose}>x</span>
          </div>
          <div className="modal__body">
            {children}
          </div>
        </div>
      </div>,
      document.body,
    )
  );
};

Modal.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node
  ]).isRequired,
  onClose: func.isRequired
};

export default Modal;
