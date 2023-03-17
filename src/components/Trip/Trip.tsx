import style from "./Trip.module.css";
import Step from "../Stepper/Step";

const Trip: React.FC<{
  distances: string[][], 
}> = (props) => {

  return <div className={style.container}>
  {
    props.distances.map( (city, i) => 
    <Step key={`${city}${i}`} separator={<Separator/>} lastStep={i === props.distances.length - 1}>
      <div className={style.content}>
        <div className={style.label}>{city[0]}</div>
        {(i !== 0) && <div className={style.distance}>{city[1]}</div>}
      </div>
    </Step>
    )
  }
</div>
}

function Separator () {
  return <div className={style.dots}>
    <div className={style.dot}></div>
    <div className={style.dot}></div>
    <div className={style.dot}></div>
  </div>;
} 
export default Trip;