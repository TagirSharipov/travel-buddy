import React from 'react';
import { render, screen } from '@testing-library/react';
//import userEvent from '@testing-library/user-event';
import App from './App';

describe('Home component', () => {
  test('renders input', () => {
    render(<App />);
    const linkElement = screen.getByText(/City of destination/i);
    expect(linkElement).toBeInTheDocument();
  });
/* 
  test('renders count increase', () => {
    render(<App />);
    
    const countElement = screen.getByText('+');
    userEvent.click(countElement);
    const inputNum = screen.getByLabelText('Passengers').closest('button');
    expect(inputNum).toHaveTextContent('2');
  }); */
});