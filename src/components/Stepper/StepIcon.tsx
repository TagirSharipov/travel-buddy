import style from './StepIcon.module.css';

const StepIcon: React.FC<{lastStep?: boolean }> = (props) => {
  switch(props.lastStep) {
  case true: 
    return <img className={style.cross} src='/cross.png' alt='step' />;
  case false: 
    return <img className={style.circle} src='/ellipse.png' alt='step' />;
  default: 
    return <img className={style.add} src='/plus.png' alt='add' />;
  }
}

export default StepIcon;