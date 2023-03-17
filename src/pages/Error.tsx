import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import style from './Error.module.css';
function Error() {
  const navigate = useNavigate();  
  return <>
      <div className={style.error}>Oops. Something went wrong!</div>
      <div className={style.submit}>
      <Button handler={() => navigate(-1)}>Back</Button>
    </div>
  </>;
}

export default Error;