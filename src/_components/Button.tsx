import React from 'react';

interface Props {
  label?: string;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  onClick?: (e: any) => void;
  disabled?: boolean;
}

function Button({label, className, type = 'button', onClick, disabled}: Props) {
  return (
    <button className={className} type={type} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

export default React.memo(Button);
