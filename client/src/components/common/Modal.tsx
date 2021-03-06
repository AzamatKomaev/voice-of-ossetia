import React from 'react';

interface IModal {
  id: string,
  title: string,
  content: JSX.Element,
  buttons: Array<{
    onClick: () => void,
    value: string,
  }>
}

const Modal = ({id, title, content, buttons}: IModal) => {
  return (
    <div className="modal fade" id={id} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">{content}</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            {buttons.map((button, index) => (
              <button
                key={index}
                type="button"
                data-bs-dismiss="modal"
                onClick={button.onClick}
                className="btn btn-danger"
              >
                {button.value}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;