import {Route,Routes} from 'react-router-dom'
import Home from './components/Home/Home';
import FormResult from './components/FormResult/FormResult';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Admin from './components/Admin/Admin';
import UserResults from './components/Admin/UserResults';



function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/home' forceRefresh={true} element={<Home/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='user/:id' element={<UserResults/>}/>
    </Routes>
  );
}

export default App;
