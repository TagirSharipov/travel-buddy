import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import styled from 'styled-components';

const Message = styled.div`
  margin: 5rem auto;
  font-size: 1.2;
  font-weight: 700;
  color: var(--blue);
`;

function Error() {
  const navigate = useNavigate();  
  return <>
      <Message>Oops. Something went wrong!</Message>
      <Button onClick={() => navigate(-1)}>Back</Button>
  </>;
}

export default Error;