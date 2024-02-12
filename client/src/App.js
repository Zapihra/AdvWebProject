import './App.css';

import ErrorPage from './components/ErrorPage';
import BookPage from './components/BookPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


function App() {

  return (
    <>
    <Router>
    <div>   
      <Routes>
        <Route path='*' element={<ErrorPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/book/:id' element={<BookPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
      </Routes>
    </div>
    </Router>
    </>
  );
}

export default App;
