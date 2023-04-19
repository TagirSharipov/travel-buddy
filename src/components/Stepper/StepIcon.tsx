import styled from 'styled-components';

const Icon = styled.img`
  height: 1.2rem;
  width: 1.2rem;    
`;
const CrossIcon = styled(Icon)`
  width: 1.1rem;  
  height: 1.5rem;
`;
const AddIcon = styled(Icon)`
  margin-top: 3rem;
`;

const StepIcon: React.FC<{lastStep?: boolean }> = (props) => {
  switch(props.lastStep) {
  case true: 
    return <CrossIcon src='/cross.png' alt='step' />;
  case false: 
    return <Icon src='/ellipse.png' alt='step' />;
  default: 
    return <AddIcon src='/plus.png' alt='add' />;
  }
}

export default StepIcon;