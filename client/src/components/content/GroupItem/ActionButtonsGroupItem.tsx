import React from 'react';

interface IButtonAttributes {
  onClick?: () => void,
  className: string,
  'data-bs-toggle'?: string,
  'data-bs-target'?: string
}

export interface IActionButtonGroupItem {
  complaining: IButtonAttributes,
  hiding: IButtonAttributes,
  deleting: IButtonAttributes,
  showHidingButton: boolean,
  showDeletingButton: boolean,
}

const ActionButtonsGroupItem = ({
  complaining,
  hiding,
  deleting,
  showHidingButton,
  showDeletingButton
}: IActionButtonGroupItem) => {
  return (
    <div className="card-body">
      {!showDeletingButton && <button {...complaining}>Пожаловаться</button>}
      {showHidingButton && <button {...hiding}>Скрыть</button>}
      {showDeletingButton && <button {...deleting}>Удалить</button>}
    </div>
  );
};

export default ActionButtonsGroupItem;