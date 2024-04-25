'use client';
import React, {useState} from 'react';
type iniitalValueProps = string;
type validatorProps = (value: string) => boolean;

export default function useInput(
  iniitalValue: iniitalValueProps,
  validator?: validatorProps
): [string, (e: React.ChangeEvent<HTMLInputElement>) => void, boolean] {
  const [value, setValue] = useState(iniitalValue);
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setValue(value);
    if (validator) {
      setIsValid(validator(value));
    }
  };

  return [value, handleChange, isValid];
}
