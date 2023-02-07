import React, { useEffect, useState } from 'react';
import { Button, Form, FormControl, Container, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';
import { useParams,  Link, useNavigate} from 'react-router-dom';
import UserResults from './UserResults';
import NavBar from '../NavBar/NavBar';



const Admin = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [teams, setTeam] = useState(['Microinformatica', 'Telecomunicaciones'])
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://prodeman-api.onrender.com/${selectedTeam}`);
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
      <NavBar/>
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
                  <tr key={index}>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                    <Link className='btn' to={`/user/${user.id}`}>
                    <button>Ver resultados</button>
                    </Link>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          </Col>
          </Row>
          </Container>
          );
          };
          
          export default Admin;