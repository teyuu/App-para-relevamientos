import axios from "axios";
import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    team: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { userName, email, password, team } = formData;

    if (!userName || !email || !password || !team) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError("El correo es inválido");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (userName.length < 3) {
      setError("El usuario debe tener al menos 3 caracteres");
      return;
    }

    try {
      const user = await axios.post(
        "https://prodeman-api.onrender.com/signup",
        formData
      );
      if (user.data === "username already taken") {
        setError("Usuario ya existente");
      } else if (user.data === "email already exist") {
        setError("Correo ya existente");
      } else {
        alert("Se ha registrado correctamente");
        navigate("/");
        console.log(user.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div
      className="p-5"
      style={{
        background:
          "url(https://i.ibb.co/5rQpsQ9/360-F-69019892-B4lc0t-M8-Q6-JXI42-Ov-K2sz-Aow-VUr7q-ZJs.jpg)",
        height: "100vh",
      }}
    >
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={6}>
            <h1 className="text-center">Registrarse</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su usuario"
                  value={formData.userName}
                  name={"userName"}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingrese su correo"
                  value={formData.email}
                  name={"email"}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  name={"password"}
                  onChange={handleInputChange}
                />
              </Form.Group>


              <FormGroup>
              <Form.Label>Equipo</Form.Label>
              <Form.Check
              type="checkbox"
              id="Telecomunicaciones"
              label="Telecomunicaciones"
              name="team"
              value={'Telecomunicaciones'}
              checked={formData.team === 'Telecomunicaciones'}
              onChange={handleInputChange}
            />
                    <Form.Check
              type="checkbox"
              id="Microinformatica"
              label="Microinformática"
              name="team"
              value={'Microinformatica'}
              checked={formData.team === 'Microinformatica'}
              onChange={handleInputChange}
            />
            <Form.Check
              type="checkbox"
              id="Admin"
              label="Admin"
              name="team"
              value={'Admin'}
              checked={formData.team === 'Admin'}
              onChange={handleInputChange}
            />
              </FormGroup>

              {error ? <p className="text-danger">{error}</p> : null}
              <Button className="mt-3" variant="primary" type="submit">
                Enviar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Registration;
