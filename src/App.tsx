import './App.css';
import Toolbar from './Components/Toolbar/Toolbar';
import {Route, Routes} from 'react-router-dom';
import Home from './Containers/Home/Home';
import AddMeal from './Containers/AddMeal/AddMeal';

const App = () => {

  return (
    <>
      <header>
        <Toolbar/>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home/>}>Home</Route>
          <Route path="/add-meal" element={<AddMeal/>}>Add Meal</Route>
        </Routes>
      </main>
    </>
  );
};

export default App;
