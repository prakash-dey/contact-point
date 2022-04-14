
import './App.css';
// import Dropdown from './components/dropdown/Dropdown';
import LoginForm from './components/loginForm/LoginForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" exact element={<LoginForm />}/>
        <Route path="/home" exact element={<Home />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
