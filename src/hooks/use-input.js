import { useState } from 'react';

const useInput = (validateValue) => {
  const [isInputTouched, setIsInputTouched] = useState(false);
  const [enteredValue, setEnteredValue] = useState('');
  const isEnteredValueValid = validateValue(enteredValue);
  const hasError = !isEnteredValueValid && isInputTouched;

  const inputChangeHandler = ev => {
    setEnteredValue(ev.target.value);
  };

  const inputBlurHandler = () => {
    setIsInputTouched(true);
  };

  const clearInput = () => {
    setEnteredValue('');
    setIsInputTouched(false);
  };

  return {
    value: enteredValue,
    isValid: isEnteredValueValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    clearInput,
  };
};

export default useInput;