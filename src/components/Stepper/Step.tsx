import styled from 'styled-components';
import StepIcon from '../Stepper/StepIcon';
import DeleteButton from '../DeleteButton/DeleteButton';
import { ReactNode } from 'react'

const StepWrapper = styled.div`
  position: relative;
`;

const Step: React.FC<{lastStep?: boolean, deleteHandler?: (() => void), children: ReactNode, separator?: ReactNode }> = (props) => {
  return (
    <StepWrapper>
      <StepIcon lastStep={props.lastStep}/>
      {props.children}
      {!props.lastStep && props.separator}
      {(props.deleteHandler) ? <DeleteButton onClick={props.deleteHandler} /> : null}
    </StepWrapper>
  )
};

export default Step;