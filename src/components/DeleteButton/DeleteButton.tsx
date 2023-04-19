import styled from 'styled-components';

const Button = styled.button`
  position: absolute;
  border: none;
  background-color: transparent;
  top: 2.6rem;
  right: -3rem;
  cursor: pointer;
  font-size: 1.2re;
`;

const DeleteButton = (props: {onClick: () => void}) => (
  <Button {...props}>
    <img src='/delete.png' alt="delete"/>
  </Button>
);

export default DeleteButton;