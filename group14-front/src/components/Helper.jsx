import React, { useState } from "react";
export const RenderTextarea = React.forwardRef(
  ({ value = [], onChange }, ref) => {
    const [text, setText] = useState(value);
    const handleChange = (e) => {
      const value = e.target.value;
      setText(value);
      onChange(value);
    };
    return (
      <textarea
        onChange={handleChange}
        value={text}
        ref={ref}
        className="form-control"
      />
    );
  }
);

export const isEmptyObj = (obj) => {
  if (obj === undefined || obj === null) return true;
  return Object.keys(obj).length === 0;
};
