import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Result from './pages/Result';
import Error from './pages/Error';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: '/result',
    element: <Result />,
    errorElement: <Error />,
  },

]
);
const theme = {
  '--grey':'#E5E7EB',
  '--darkGrey': '#374151',
  '--lightBlue': '#c7d1f4',
  '--blue': '#7786D2',
} as React.CSSProperties;

function App() {
  return (
    <div className="mainContainer" style={theme}>

      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>

    </div>
  )
}

export default App;
