import TextButton from "../TextButton/TextButton";
import TextInput from "../TextInput/TextInput";
import DeleteButton from '../DeleteButton/DeleteButton';
import style from "./Planner.module.css";
import Step from "../Stepper/Step";

const Planner: React.FC<{
  steps: string[], 
  deleteStep: (i:number) => void,
  chooseValue: (i:number, v:string) => void,
  addStep: () => void,
  validateStep: (v: boolean, i: number) => void,
}> = (props) => {
  const {steps, deleteStep, validateStep, chooseValue, addStep} = props;

  return <div className={style.container}>
    {
    steps.map( (value, i) =>
      <Step key={`${value}${i}`} lastStep={i === steps.length - 1} separator={<Separator/>}>
        <div className={style.content}>
          <TextInput
            label={`City of ${i === 0 ? 'origin':'destination'}`}
            value={value}
            validateStep={(v) => validateStep(v,i)}
            handler={(v: string) => chooseValue(i, v)}
          />
          {(steps.length > 2 && i > 0) && <DeleteButton onClick={() => deleteStep(i)} />}
        </div>
      </Step>
    )}
    <Step>
      <div className={style.add}>
        <TextButton handler={() => addStep()}>Add destination</TextButton>
      </div>
    </Step>
  </div>
}

function Separator () {
  return <div className={style.dots}>
    <div className={style.dot}></div>
    <div className={style.dot}></div>
    <div className={style.dot}></div>
    <div className={style.dot}></div>
    <div className={style.dot}></div>
    <div className={style.dot}></div>
  </div>;
} 
export default Planner;