import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Navigation from './Components/Navigation';
import City from './Pages/City';

function App() {
  return (
    <div className='flex flex-col min-h-screen font-Roboto bg-weather-primary'>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/weather/:state/:city' element={<City />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
