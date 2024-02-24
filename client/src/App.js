import './App.css';

import ErrorPage from './components/ErrorPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import ChatPage from './components/ChatPage';
import TClonePage from './components/ClonePage';
import InfoPage from './components/InfoPage';
//import ChatMailPage from './components/ChatMailPage';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
const bootstrap = require('bootstrap')

function App() {
  

  var head = document.getElementsByTagName('head')
  var meta = document.createElement("meta")
  meta.name = "viewport"
  meta.content = "width=device-width, initial-scale=1"

  // var link = document.createElement("link")
  // link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous'
  // head[0].appendChild(meta)
  // head[0].appendChild(link)

  // var body = document.getElementsByTagName('body')
  // var script = document.createElement('script')
  // script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous'
  // body[0].appendChild(script)

  return (
    <>
    <Router>
    <div>   
      <Routes>
        <Route path='*' element={<ErrorPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/profile/:id' element={<ProfilePage/>}/>
        <Route path='/chats/:id/:page' element={<ChatPage/>}/>
        <Route path='/info' element={<InfoPage/>}/>
        <Route path='/tclone' element={<TClonePage/>}/>
      </Routes>
    </div>
    </Router>
    </>
  );
}

export default App;
