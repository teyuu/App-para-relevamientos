import axios from "axios";
import React, { useState } from "react";
import { Form, FormControl, Button, FormLabel, FormGroup, Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePlace,getResultsUser } from "../../redux/actions";

const options = [
  { value: "casaPrincipal", label: "Casa principal" },
  { value: "exAgroinsumos", label: "ExAgroinsumos" },
  { value: "taller", label: "Taller" },
  { value: "hangar", label: "Hangar" },
  { value: "hangarOficina", label: "Hangar oficina" },
  { value: "balanza", label: "Balanza" },
  { value: "agroInsumos", label: "AgroInsumos" },
  { value: "camaras", label: "Camaras" }
];

const MyForm = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const user = useSelector((state)=> state.user)
  const dispatch = useDispatch();

  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleOnSubmit = async (e) =>{
    e.preventDefault()

    try{
      const result = await axios.post('http://localhost:3001/form/place', {name:selectedOption, userId: user[0].id})
      if(result.data){
        dispatch(savePlace(result.data))
        dispatch(getResultsUser({userId:result.data[0].userId, placeId:result.data[0].id}))
      }
    }catch(err){
      console.log(err)
    }

  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleOnSubmit}>
                <FormGroup>
                  <FormLabel>Selecciona una opción:</FormLabel>
                  <FormControl as="select" value={selectedOption} onChange={e => handleOptionChange(e.target.value)}>
                    <option>Seleccione una opcion</option>
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </FormControl>
                </FormGroup>
                <Button variant="primary" type="submit">
                  Seleccionar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MyForm;


