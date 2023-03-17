import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from 'react';
import style from "./Home.module.css";
import Planner from "../components/Planner/Planner";
import NumberInput from "../components/NumberInput/NumberInput";
import CustomDatePicker from "../components/CustomDatePicker/CustomDatePicker";
import { makeURL } from "../utils";
import Button from "../components/Button/Button";


function Home() {
  const [searchParams] = useSearchParams();
  const citiesParam = searchParams.get("params") ?? '';
  const cities = citiesParam.split(',');
  const [steps, setSteps] = useState((cities.length > 1) ? cities: [cities[0], '']);
  const [validSteps, setValidSteps] = useState((cities.length > 1) ? cities.map( (c) => c ? true:false):[false,false]);
  const [count, setCount] = useState(searchParams.get('count') ?? 1);
  const [date, setDate] = useState(new Date(searchParams.get('date') ?? new Date()));
  const navigate = useNavigate();  


  function chooseCity(index: number, v: string) {
    const arr = [...steps]
    arr.splice(index, 1, v);
    updateStateAndSearch(arr);

    const valid = [...validSteps]
    valid.splice(index,1, true);
    setValidSteps(valid);
  }

  function deleteStep(index: number) {
    const arr = [...steps]
    arr.splice(index,1);
    updateStateAndSearch(arr);

    const v = [...validSteps]
    v.splice(index,1);
    setValidSteps(v);
  }

  const addStep = () => {
    const arr = [...steps, ''];
    updateStateAndSearch(arr);

    const v = [...validSteps]
    v.push(false);
    setValidSteps(v);
  }

  function updateStateAndSearch(arr: string[]) {
    setSteps(arr);
    navigate(makeURL(arr.join(), count, date.toISOString()));
  }
  
  const isValid = validSteps.reduce((prev,next) => prev && next, true);

  function validateStep(valid: boolean, index:number) {
    const v = [...validSteps]
    v[index] = valid;
    setValidSteps(v);
  }

  function updateCount(val: number) {
    setCount(String(val));
    navigate(makeURL(citiesParam, val, date.toISOString()));
  }
  
  function updateDate(val: Date) {
    setDate(val);
    navigate(makeURL(citiesParam, count, val.toISOString()));
  }

  function submit() {
    navigate(makeURL(steps.join(), count, date.toISOString(), '/result'));
  }

  return <div className={style.container}>
    <div className="stepper">
      <Planner steps={steps} 
        deleteStep={deleteStep}
        chooseCity={chooseCity}
        addStep={addStep}
        validateStep={validateStep}
      />
    </div>
    <div className={style.sideControls}>
      <div className="passengers">
        <NumberInput initialValue={Number(count)} label="Passengers" handler={(v:number) => updateCount(v)}/>
      </div>
      <div className={style.date}>
        <CustomDatePicker handler={date => updateDate(date)} date={date}/>
      </div>
    </div>
    <div className={style.submit}>
      <Button disabled={!isValid} handler={() => submit()}>Submit</Button>
    </div>
  </div>
}


export default Home;
