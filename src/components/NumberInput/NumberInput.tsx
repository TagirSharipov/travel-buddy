import { useRef } from 'react';
import styled from 'styled-components';

const Button = styled.button<{ left?: boolean }>`
  position: absolute;
  background:var(--lightBlue);
  border: 1px solid var(--grey);
  border-radius: 4px;
  color: white;
  cursor: pointer;
  width: 2.2rem;
  height: 2.2rem;
  bottom: 5px;
`;
const LeftButton = styled(Button)`
  left: 1rem;
`;
const RightButton = styled(Button)`
  right: 1rem;
`;

const Wrapper = styled.div`
  font-size: 1.2rem;
  position: relative;
  width: 9rem;

  & label {
    display: block;
  }
`;

const Input = styled.input`
  border: 1px solid var(--grey);
  background-color: white;
  border-radius: .6rem;
  height: 3.2rem;
  padding: .8rem 3.2rem .8rem 3.2rem;
  width: 9rem;
  text-align: center;
`;


const NumberInput: React.FC<{ label: string, initialValue: number, setValue: (val: number) => void }> = (props) => {
  const ref = useRef<HTMLInputElement>(null);

  return <Wrapper>
    <label htmlFor="num">{props.label}</label>
    
    <LeftButton onClick={() => props.setValue(props.initialValue - 1)}>
      -
    </LeftButton>
    
    <Input 
      id="num" 
      ref={ref} 
      value={props.initialValue} 
      onChange={(e) => props.setValue(Number(e.target.value))}
    />
    
    <RightButton onClick={() => props.setValue(props.initialValue + 1)}>
      +
    </RightButton>

  </Wrapper>
}

export default NumberInput;