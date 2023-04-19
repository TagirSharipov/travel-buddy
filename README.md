# Travel Buddy - React App

Travel Buddy is a web application created using TypeScript and React that allows users to search for travel destinations and calculate the distances between them. I сcompleted this coding task as a part of application process to Senior Developer position in a transport company.

## The Task

Imagine you've been hired to write an app that will allow people to perform searches to know the distance of a route that may consist of 2 or more cities, to enable them to plan their travel. The following design is given as a guide, and pixel-perfect implementation is not required (...).

Imagine that the backend API can NOT return you the full list of cities, and you’ll need to search the cities with a keyword.

The app should consist of two pages: the search form (home page) and the search results.

On the home page there should be a search form. The form should consist of the following fields:

- City of origin. Required to fill. A searchable dropdown (combobox) with a list of cities. The list of cities should be requested and searched asynchronously with the loading indication.

- Intermediate cities. Same as City of origin. There should be a way to add/remove multiple intermediate cities. No intermediate cities should be shown when the page is first loaded. If an intermediate city is added it has to be filled.

- City of destination. Required to fill. Same as City of origin.

- Date of the trip. Required to fill. Should be a date in the future.

- Number of passengers. Required to fill. Should be a number greater than 0.

The form should be validated. If some field has an invalid value the error should be shown around the problematic field and the submit button should be disabled. The submit button when clicked should navigate to the search results page.

The home page should allow deep-linking: form data should store in the URL, so when a user copy and share the link, the form can be pre-filled with the data from the URL parameters.

On the search results page all the fields filled on the home page should be displayed. The distance of the route (in kilometers) should be calculated and displayed: between subsequent cities of the route and the total distance. The distance calculation should be performed asynchronously with loading indication and error handling.

The search results page should take all parameters from the URL, meaning that the link to a particular search result can be shared with others.

### Technical Requirements
The application should be implemented as a SPA (single page application) using React and TypeScript. Usage of libraries to speed up the development and app quality is very welcome, as well as usage of a design system of your choice to provide the best user experience possible in the shortest time frame. 

To implement a cities database hardcode the list of cities and simulate the delay of requesting the cities. You can find an example list of cities in the Appendix A. The fake backend should have two endpoints (functions). The first endpoint receives a keyword and returns a list of cities that match the keyword. The second endpoint receives a list of cities and calculates the distances.

When a user attempts to find cities using the phrase “fail” (case-insensitive) the mocked API should fail to return results to demonstrate the error handling abilities of the UI.

To implement the distance calculation use Haversine distance formula and simulate the delay of the calculation. When “Dijon” city is involved the distance calculation should fail to demonstrate the error handling abilities of the UI.


## Packages used

- Typescript
- React Hooks
- Tests with react-testing-library
- Redux Toolkit
- Styled components
- React Router 6

## Installation

To install the necessary dependencies, run:

```bash
npm install
```

## Usage

To start the application, run:

```bash
npm start
```

This will start the app on [http://localhost:3000](http://localhost:3000) in your browser.

A demo version of the app is also available at [https://travel-buddy-6b85d.web.app/](https://travel-buddy-6b85d.web.app/) for you to try out.

## Features

- Search for travel destinations by entering a city (a limited list).
- Add a destination to the route by clicking on the 'Add destination' link.
- Specify the passengers count and travel date.
- Remove a destination from your list of favorites by clicking on the cross icon again.
- Share the route planning or trip distances by sending the link from the address bar of the browser. 

## Improvements to be made

- UI-components library like Material UI or Ant Design can be used to create more polished and professional user interface.
- Additional unit tests can be added to increase test coverage. I made only a few.

## Contributors

- Tagir Sharipov (@TagirSharipov) - Initial work

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
