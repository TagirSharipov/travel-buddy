import { useState } from 'react';
import style from './NumberInput.module.css';


const NumberInput: React.FC<{ label: string, initialValue: number, handler: (v:number) => void }> = (props) => {
  const [value, setValue] = useState(props.initialValue);

  function updateValue(v:number) {
    setValue(v);
    props.handler(v);
  }

  return <div className={style.wrapper}>
    <label htmlFor="num" className={style.label}>{props.label}</label>
    <button className={style.button} onClick={() => value > 1 ? updateValue(value - 1) : updateValue(1)}>-</button>
    <input id="num" value={value} className={style.input} onChange={(e) => updateValue(Number(e.target.value))}/>
    <button className={style.rightButton} onClick={() => value < 100 ? updateValue(value + 1): updateValue(100)}>+</button>
  </div>
}

export default NumberInput;