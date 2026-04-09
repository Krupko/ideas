import React from 'react';

import './Textaria.scss';

export const Textarea = ({
  name,
  label,
  state,
  setState,
}: {
  name: string;
  label: string;
  state: Record<string, string>;
  setState: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) => {
  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name}>{label}</label>
      <br />
      <textarea
        onChange={(e) => {
          setState({ ...state, [name]: e.target.value });
        }}
        value={state[name]}
        name={name}
        id={name}
      />
    </div>
  );
};
