import React from 'react';
import { Navbar, Nav, CloseButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { saveUser } from '../../redux/actions'
import { useDispatch,useSelector } from 'react-redux';


const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.user[0])

    const handleLogOut = ()=>{
        localStorage.clear()
        dispatch(saveUser())
        navigate('/')
    }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        <img style={{width:'100px'}} src="https://i.ibb.co/74k7LWd/silo-verde-01.png"  alt="imgAcopio"  />
      </Navbar.Brand>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <div className='d-flex flex-column mx-5'>
            <span>Usuario: {user.userName}</span>
            <span>Equipo: {user.team}</span>
          </div>
          
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="#link">Visitas</Nav.Link>
          <Nav.Link href="#link">Perfil</Nav.Link>
          <button className='btn btn-success' onClick={handleLogOut} >Cerrar sesion</button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

