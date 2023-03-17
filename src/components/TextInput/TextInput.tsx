import { useState, useEffect, useRef } from "react";
import useInput from "../../hooks/use-input";
import ItemList from "./ItemList";
import './TextInput.css';
import {loadCities} from "../../api";

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
    <div className="wrapper" ref={ref}>
      <label htmlFor="input" className="label">{props.label}</label>
      <input
        id="input"
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
        className={`${"input"}${hasError && !open ? " red":""}`}
        autoComplete="off"
      />
      {(hasError && !open) && <div className="error">You must choose the {props.label.toLowerCase()}</div>}
      {open && <ItemList loading={loading} items={cities} handler={chooseCity}/>}
    </div>
  );
};

export default TextInput;
