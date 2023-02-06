import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {saveUser} from '../../redux/actions'
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();

    try{
        const user =  await axios.post('https://prodeman-api.onrender.com/login', {email, password})
        if(user.data){
            localStorage.setItem("user", JSON.stringify(user.data))
            dispatch(saveUser())
            alert('Ha ingresado correctamente')
            console.log(user.data)
            navigate('/home')
        }
    }catch(error){
        alert('Correo o contraseña incorrecto')
    }
  };



  return (
    <div className="p-5" style={{background:'url(https://i.ibb.co/5rQpsQ9/360-F-69019892-B4lc0t-M8-Q6-JXI42-Ov-K2sz-Aow-VUr7q-ZJs.jpg)', height:'100vh'}}>
    <Container>
      <Row className="justify-content-md-center">
        <Col sm={6} >
        <h3 className="text-decoration-underline">Bienvenido a la plataforma de relevamiento y funcionamiento de equipos informaticos</h3>
        <p >Inicie sesion o registrese para continuar</p>
        <Button onClick={()=>navigate('/register')} className="mt-2" variant="primary">
              Registrarse
            </Button>
        </Col>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Correo electronico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su correo"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>

            <Button className="mt-2" variant="primary" type="submit">
              Iniciar sesion
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Login;
