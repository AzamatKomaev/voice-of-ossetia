import React from 'react';

interface IContentGroupItem {
  title: string | null,
  description: string,
  border: boolean
}

const ContentGroupItem = ({title, description, border}: IContentGroupItem) => {
  return (
    <li
      className="list-group-item"
      style={{border: border ? "1px solid rgba(0,0,0,.125)" : "none"}}
    >
      {title && <h5 className="card-title">{title}</h5>}
      <p className="card-text">{description}</p>
    </li>
  );
};

export default ContentGroupItem;