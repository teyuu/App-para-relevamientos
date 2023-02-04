import {Route,Routes} from 'react-router-dom'
import Home from './components/Home/Home';
import FormResult from './components/FormResult/FormResult';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/home' forceRefresh={true} element={<Home/>}/>
      <Route path='/result' element={<FormResult/>}/>
      
    </Routes>
  );
}

export default App;
