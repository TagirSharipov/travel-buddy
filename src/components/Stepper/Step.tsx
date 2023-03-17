import style from './Step.module.css';
import StepIcon from '../Stepper/StepIcon';
import DeleteButton from '../DeleteButton/DeleteButton';
import { ReactNode } from 'react'

const Step: React.FC<{lastStep?: boolean, deleteHandler?: (() => void), children: ReactNode, separator?: ReactNode }> = (props) => {
  return <div className={style.step}>
    <StepIcon lastStep={props.lastStep}/>
    {props.children}
    {!props.lastStep && props.separator}
    
    {(props.deleteHandler) ? <DeleteButton handler={props.deleteHandler} /> : null}
  </div>
}


export default Step;