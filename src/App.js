import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import Category from './pages/Category';
import Quiz from './pages/Quiz';
import Protect from './Protect';
import LoginSignup from './pages/LoginSignup';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LoginSignup />} />
          <Route exact path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/category' element={<Protect><Category /></Protect>} />
          <Route path='/quiz/:name' element={<Protect><Quiz /></Protect>} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>

    </div>
  );
}

export default App;
