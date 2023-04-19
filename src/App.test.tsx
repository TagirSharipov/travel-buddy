import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Home component', () => {
  
  test('renders input City of destination', () => {
    render(<App />);
    const linkElement = screen.getByText(/City of destination/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('count increase and query param set', async () => {
    render(<App />);
    const countElement = screen.getByText('+');
    
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {                                                                                                           
      userEvent.click(countElement);                                                                               
    });

    const inputNum = await screen.findByLabelText('Passengers') as HTMLInputElement;
    expect(inputNum.value).toBe('2');
    expect(window.location.search.split('&').find(a => a === 'count=2')).toBe('count=2');

//todo
    
  });
 
  test('count not decreases less than 1', async () => {
    render(<App />);
    
    const countElement = screen.getByText('-');
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {   
      userEvent.click(countElement);
      userEvent.click(countElement);
    });
    const inputNum = await screen.findByLabelText('Passengers') as HTMLInputElement;
    expect(inputNum.value).toBe('1');
    expect(window.location.search.split('&').find(a => a === 'count=1')).toBe('count=1');
  }); 

  test('renders Date field with the current day', async() => {
    render(<App />);
    const input = screen.getByDisplayValue(new Intl.DateTimeFormat('en-US', {month: '2-digit', day:'2-digit', year: 'numeric'}).format(new Date())) as HTMLInputElement;
    expect(input).toBeInTheDocument();
  }); 

  test('opens DatPicker with the selected current day and set the date param', async () => {
    render(<App />);
    const input = await screen.findByDisplayValue(new Intl.DateTimeFormat('en-US', {month: '2-digit', day:'2-digit', year: 'numeric'}).format(new Date())) as HTMLInputElement;
    
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => userEvent.click(input));
    const selects = await screen.findAllByRole('option', {selected: true}) as HTMLInputElement[];
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const date = new Date()
    expect(selects[0].value).toBe(months[date.getMonth()]);
    expect(selects[1].value).toBe(date.getFullYear().toString());
    expect(selects[2].innerHTML).toBe(date.getDate().toString());
    const isoDate = `${date.getFullYear().toString()}-${date.getMonth()>9 ? '':'0'}${date.getMonth()+1}-${date.getDate().toString()}`;
    expect(window.location.search.split('&').find(a => a.indexOf(`date=${isoDate}`) > -1)).toBeTruthy();
  });

  test('choose the origin city and set the query param', async() => {
    render(<App />);
    const input = screen.getByRole('textbox', {name: 'City of origin'}) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => userEvent.type(input, 'a'));

    const firstCity = await screen.findByRole('button', {name: 'Paris'});
    expect(firstCity).toBeInTheDocument();
    const lastCity = await screen.findByRole('button', {name: 'Aix-en-Provence'});
    expect(lastCity).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => userEvent.click(lastCity));
    expect(window.location.search.split('&').find(a => a.indexOf(`params=Aix-en-Provence`) > -1)).toBeTruthy();
 
  });
  test('submit button is disabled', () => {
    render(<App />);
    const submit = screen.getByRole('button', {name: 'Submit'});
    expect(submit).toBeDisabled();
  });

  test('choose the destination city and set the query param', async() => {
    render(<App />);
    const input = screen.getByRole('textbox', {name: 'City of destination'}) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => userEvent.type(input, 'b'));

    const destCity = await screen.findByRole('button', {name: 'Grenoble'});
    expect(destCity).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => userEvent.click(destCity));
    console.log(window.location.search)
    expect(window.location.search.split('&').find(a => a.indexOf(`params=Aix-en-Provence,Grenoble`) > -1)).toBeTruthy();
 
  });
  test('submit button is enabled', () => {
    render(<App />);
    const submit = screen.getByRole('button', {name: 'Submit'});
    expect(submit).toBeEnabled();
  });

});