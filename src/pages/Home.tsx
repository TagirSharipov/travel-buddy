import { useSearchParams, useNavigate } from "react-router-dom";
import { useState} from 'react';
import style from "./Home.module.css";
import Planner from "../components/Planner/Planner";
import NumberInput from "../components/NumberInput/NumberInput";
import CustomDatePicker from "../components/CustomDatePicker/CustomDatePicker";
import Button from "../components/Button/Button";

function Home() {
  const [searchParams] = useSearchParams();
  const trip = new TravelParams(searchParams);
  
  const [validSteps, setValidSteps] = useState([...trip.validCities]);
  const navigate = useNavigate();

  function updateParam(url = '') {
    navigate(trip.getQueryParams(url));
  }

  function updateParams(callback: any) {
    return (...args: any[]) => {
      callback(...args); 
      setValidSteps([...trip.validCities]);
      navigate(trip.getQueryParams());
    }
  }

  const disabled = !validSteps.reduce((prev,next) => prev ? next : '', validSteps[0]);
  return (
    <div className={style.container}>
      <Planner steps={trip.cities} 
        deleteStep={updateParams(trip.deleteCity.bind(trip))}
        chooseValue={updateParams(trip.chooseCity.bind(trip))}
        addStep={updateParams(trip.addCity.bind(trip))}
        validateStep={updateParams(trip.validateCity.bind(trip))}
      />
    <div className={style.sideControls}>
        <NumberInput initialValue={trip.count} label="Passengers" setValue={v => updateParam(v.toString())}/>
        <CustomDatePicker handler={v => updateParam(v.toISOString())} date={trip.date}/>
    </div>
    <div className={style.submit}>
      <Button 
        disabled={disabled}
        onClick={() => navigate(trip.getQueryParams('/result'))}
      >
        Submit
      </Button>
    </div>
  </div>
)}


class TravelParams {
  cities: string[];
  count: number;
  date: Date;
 //url: string;
  validCities: string[];
  constructor(search: URLSearchParams) {
    this.cities = (search.get("params") ?? ',').split(',');
    this.count = Number(search.get('count') ?? 1);
    this.date = new Date(search.get('date') ?? new Date());
    this.validCities = (search.get("valid") ?? ',').split(',');
  }

  chooseCity(index: number, s: string): void {
    this.cities.splice(index, 1, s);
    this.validCities.splice(index, 1, s);
  }
  addCity(): void{
    this.cities.push('');
    this.validCities.push('');
  }
  deleteCity(index: number): void {
    this.cities.splice(index, 1);
    this.validCities.splice(index, 1);
  }

  getQueryParams(url = ''): string {
    return `${url}/?params=${this.cities.join()}&count=${this.count}&date=${this.date.toISOString()}&valid=${this.validCities.join()}`;
  }

  setCount(n : number) {
    this.count = n;
  }

  setDate(d : Date) {
    this.date = d;
  }

  validateCity(valid: boolean, index:number) {
    if (!valid) this.validCities[index] = '';
  }
}


export default Home;
