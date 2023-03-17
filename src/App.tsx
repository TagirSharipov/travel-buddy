import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Result from './pages/Result';
import Error from './pages/Error';
import './App.css';

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
function App() {
  return <div className="mainContainer">
    <RouterProvider router={router} />
  </div>
}

export default App;
