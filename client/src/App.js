import './App.css';

import ErrorPage from './components/ErrorPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import ChatPage from './components/ChatPage';
import TClonePage from './components/ClonePage';
import InfoPage from './components/InfoPage';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


function App() {

  return (
    <>
    <Router>
    <div>   
      <Routes>
        <Route path='*' element={<ErrorPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/profile/:id' element={<ProfilePage/>}/>
        <Route path='/chats' element={<ChatPage/>}/>
        <Route path='/info' element={<InfoPage/>}/>
        <Route path='/tclone' element={<TClonePage/>}/>
      </Routes>
    </div>
    </Router>
    </>
  );
}

export default App;
