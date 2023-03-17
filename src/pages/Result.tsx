import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Button from "../components/Button/Button";
import style from "./Result.module.css";
import Trip from "../components/Trip/Trip";
import { calcRoute } from "../api";
import { makeURL } from "../utils";

function Result() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();  
  const [distances, setDistances] = useState<string[][]>([[]]);
  const [total, setTotal] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  if (error) throw new Error();

  
  useEffect(() => {
    async function callEndpoint() {
      setLoading(true);
      try {
        const str = searchParams.get("params") ?? '';
        const [cities, acc] = await calcRoute(str);
        setLoading(false);
        setDistances(cities);
        setTotal(acc);
      } catch (e) {
        setError(true);
      }
    }
    callEndpoint();
  }, [searchParams])

  let options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  
  if (loading) return <div className={style.loading}>Calculating the trip...</div>;

  return <div className={style.container}>
    <div className="stepper">
      <Trip distances={distances} />
    </div>
    <div className={style.info}>
      {total && <div className="total">
        <span className={style.highlight}>{(total / 1000).toFixed(2)}</span> km is total distance
      </div>
      }
      <div className={style.passengers}>
         <span className={style.highlight}>{searchParams.get("count")}</span> passengers
      </div>
      <div className="date">
         <span className={style.highlight}>{new Intl.DateTimeFormat('en-US', options).format(new Date(searchParams.get("date") ?? new Date()))}</span>
      </div>
    </div>
    <div className={style.submit}>
      <Button handler={() => navigate(makeURL(searchParams.get("params") ?? '', searchParams.get("count") ?? '', searchParams.get("date") ?? ''))}>Back</Button>
    </div>
  </div>
}


export default Result;
