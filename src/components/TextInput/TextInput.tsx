import { useState, useEffect, useRef } from "react";
import useInput from "../../hooks/use-input";
import ItemList from "./ItemList";
import {loadCities} from "../../api";
import * as S from "./styles";

const TextInput: React.FC<{ label: string, value?: string, handler: (v: string) => void, validateStep: (v: boolean) => void}> = (props) => {
  const [open, setOpen] = useState(false);
  const [cities, setCities] = useState<string[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  if (error) throw new Error();

  const { value, isValid, hasError, onChange, onBlur, setValue, resetTouched } = useInput(
    (v: never) => cities.includes(v),  props.value
  );

  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | KeyboardEvent) => {
      if (ref && ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keypress', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keypress', handleClickOutside);
    }
  }, [ref]);

  useEffect(() => {
    async function callEndpoint() {
      
      try {
        setLoading(true);
        const filtered = await loadCities(value.trim());
        setLoading(false);
        setCities(filtered);
      } catch (e) {
        setError(true);
      }
    }
    callEndpoint();
  }, [value]);

  const chooseCity = (city: string) => {
    resetTouched();
    props.handler(city);
    setOpen(false);
    setValue(city);
  };


  return (
    <S.Wrapper ref={ref}>
      <label htmlFor={props.label}>{props.label}</label>
      <S.Input
        id={props.label}
        type="text"
        value={value}
        onChange={e => {
          setOpen(true);
          onChange(e);
        }}
        onBlur={() => {
          onBlur(); 
          if (isValid) chooseCity(value) 
          else props.validateStep(isValid);
        }}
        hasError={hasError && !open }
        autoComplete="off"
      />
      {(hasError && !open) && <S.ErrorMessage>You must choose the {props.label.toLowerCase()}</S.ErrorMessage>}
      {open && <ItemList loading={loading} items={cities} handler={chooseCity}/>}
    </S.Wrapper>
  );
};



export default TextInput;
