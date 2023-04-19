import styled from 'styled-components';

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: var(--blue);
  cursor: pointer;
  font-size: 1.2rem;
  min-width: 10rem;
  text-align: left;
`;


const  TextButton: React.FC<{handler: () => void, children: string}> = (props) => {
  return <Button onClick={props.handler}>
    {props.children}
  </Button>
}
export default TextButton;