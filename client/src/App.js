import './App.css';
import AddBook from "./components/AddBook"
import ErrorPage from './components/ErrorPage';
import BookPage from './components/BookPage';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


function App() {

  return (
    <>
    <Router>
    <div>   
    <h1>books</h1>
      <Routes>
        <Route path='*' element={<ErrorPage/>}/>
        <Route path='/' element={<AddBook/>} />
        <Route path='/book/:id' element={<BookPage/>}/>
      </Routes>
    </div>
    </Router>
    </>
  );
}

export default App;
