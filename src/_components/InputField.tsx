import React from 'react';

interface Props {
  id: string;
  name: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  accept?: string;
  checked?: boolean;
}

function InputField({
  id,
  name,
  type,
  value,
  onChange,
  placeholder,
  className,
  required,
  accept,
  checked,
}: Props) {
  return (
    <>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        required={required}
        accept={accept}
        checked={checked}
      />
    </>
  );
}

export default React.memo(InputField);
