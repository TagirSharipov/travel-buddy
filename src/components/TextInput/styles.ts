import styled from "styled-components";

export const Input = styled.input<{hasError: boolean}>`
border: 1px solid var(--grey);
background-color: 'white';
color: ${props => props.hasError ? 'red':'inherited'};
border-radius: .6rem;
height: 3.2rem;
padding: .8rem 1.2rem .8rem 1rem;
min-width: 23rem;
`;

export const ErrorMessage = styled.div`
color: red;
position: absolute;
top: 5rem;
`;

export const Wrapper = styled.div`
display: flex;
flex-direction: column;
font-size: 1.2rem;
font-weight: 500;
line-height: 1.6rem;
gap: 2px;
position: relative;
margin-bottom: 2rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: .6rem;
  border: 1px solid var(--lightBlue);
  box-shadow: 0px 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  background: white;
  position: absolute;
  top: 55px;
  z-index: 1;
  width: 100%;
  &:before {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    border-bottom: solid 5px var(--lightBlue);
    border-left: solid 5px transparent;
    border-right: solid 5px transparent;
    top: -5px;
    left: 12px;
  }
`;

export const ListButton = styled.button` 
  background: white;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  height: 2.8rem;
  padding: 0.6rem;
  &:hover {
    background: var(--lightBlue);
    border-radius: 0.6rem;
  }
`;
export const LoadingButton = styled(ListButton)`
  background: var(--grey);
  border-radius: 4px;
  max-width: 20rem;
  height: 20px;
  margin-bottom: 0.6rem;
  &:last-child {
    margin-bottom: 0;
  }
`;