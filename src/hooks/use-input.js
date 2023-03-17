import { useState } from 'react';

const useInput = (validate, initialValue) => {
  const [touched, setTouched] = useState(false);
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
   /*  setTouched(true); */
  };

  const onBlur = (e) => {
    setTouched(true);
  };

  const resetTouched = () => {
    setTouched(false);
  };

  const isValid = validate(value);

  const hasError = !isValid && touched;

  return { value, hasError, isValid, onChange, onBlur, resetTouched, setValue };
};
export default useInput;
