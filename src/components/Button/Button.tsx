import styled from 'styled-components';


const Button = styled.button`
  padding: 8px 12px 8px 12px;
  background: var(--darkGrey);
  border: 1px solid var(--grey);
  border-radius: 4px;
  font-weight: 500;
  font-size: 1.4rem;
  color: white;
  cursor: pointer;
  line-height: 20px;

  &:disabled {
    background-color: var(--grey);
    cursor: auto;
  }

  @media only screen and (max-width: 400px) {
      width: 100%;
  }
`;

const Wrapper = styled.div`
  text-align: center;
`;

const ButtonWrapped = (props: any ) => <Wrapper><Button {...props} /></Wrapper>

export default ButtonWrapped;