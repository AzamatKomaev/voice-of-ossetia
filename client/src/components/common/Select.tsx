import React from 'react';

interface ISelect {
  name: string,
  options: Array<string | number>,
  value: string | undefined,
  setFn: (value: any) => void
}

const Select = ({options, name, value, setFn}: ISelect) => {
  return (
    <select
      className="form-select"
      id={name}
      name={name}
      value={value}
      onChange={e => setFn(e.target.value)}
    >
      <option>{name}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  );
};

export default Select;