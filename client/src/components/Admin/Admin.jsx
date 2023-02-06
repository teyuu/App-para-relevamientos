import React, { useEffect, useState } from 'react';
import { Button, Form, FormControl, Container, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';
import { useParams,  Link, useNavigate} from 'react-router-dom';
import UserResults from './UserResults';



const Admin = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [teams, setTeam] = useState(['Microinformatica', 'Telecomunicaciones'])
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/user/getusers/${selectedTeam}`);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedTeam) {
      fetchData();
    }
  }, [selectedTeam]);



  const handleTeamSelect = (e) => {
    const selectedTeamIndex = e.target.value;
    setSelectedTeam(selectedTeamIndex);
    setSelectedUser(null);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);

  };
console.log(selectedUser)
  return (
    <Container>
      <Row>
        <Col xs={3}>
          <Form>
            <Form.Group controlId="teamSelect">
              <Form.Label>Selecciona un equipo:</Form.Label>
              <FormControl as="select" onChange={handleTeamSelect}>
                <option value="">Selecciona un equipo</option>
                {teams.map((team, index) => (
                  <option key={index} value={team}>
                    {team}
                  </option>
                ))}
              </FormControl>
            </Form.Group>
          </Form>
        </Col>
        <Col xs={9}>
          {selectedTeam && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Correo</th>
                  <th>Resultados</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, index) => (
                  <tr key={index}  style={{ cursor: 'pointer' }}>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                    <Link className='btn' to={`/user/${user.id}`}>
                    <td>Ver resultados</td>
                    </Link>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {selectedUser && (

            <div>
            <h3>Información de Usuario:</h3>
            <p>Nombre: </p>
            <p>Edad: </p>
            <p>Posición: </p>
          </div>
          )}
          </Col>
          </Row>
          </Container>
          );
          };
          
          export default Admin;