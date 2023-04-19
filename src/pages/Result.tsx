import { useSearchParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import { useEffect } from 'react';
import Button from "../components/Button/Button";
import Trip from "../components/Trip/Trip";
import styled from 'styled-components';
import { calcTripDistances, selectTripDistances, selectLoading, selectTotalDistance,selectError } from '../store/';

const Info = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 2rem;
  text-align: center;
  margin: 2rem 0 2.5rem;
`;
const Highlight = styled.span`
  color: var(--blue);
  font-weight: 700;
`;
const Loading = styled.div`
  padding: 10rem 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

function Result() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();  
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const distances = useAppSelector(selectTripDistances);
  const total = useAppSelector(selectTotalDistance);

  if (error) throw new Error();
  
  useEffect(() => {
    dispatch(calcTripDistances((searchParams.get("params") ?? '').split(',')));
  }, [searchParams, dispatch])

  let options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  
  if (loading) return <Loading>Calculating the trip...</Loading>;

  return <Container>
      <Trip distances={distances} />
      <Info>
        {total && <div>
          <Highlight>{(total / 1000).toFixed(2)}</Highlight> km is total distance
        </div>
        }
        <div>
          <Highlight>{searchParams.get("count")}</Highlight> passengers
        </div>
        <div>
          <Highlight>{new Intl.DateTimeFormat('en-US', options).format(new Date(searchParams.get("date") ?? new Date()))}</Highlight>
        </div>
    </Info>
    <Button onClick={() => navigate(`/?params=${searchParams.get("params")}&count=${searchParams.get("count")}&date=${searchParams.get("date")}&valid=${searchParams.get("valid")}`)}>Back</Button>
  </Container>
}
export default Result;
