import React, { useState } from 'react';
import { Form, Button, FormGroup } from 'react-bootstrap';
import { getResultsUser } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const EditForm = ({item_relevar, decision, observaciones, userId, placeId}) => {
  const [isEditing, setEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    item_relevar,
    decision,
    observaciones,
    userId,
    placeId,
  });
  
  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value }}) => {
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit= async(e)=>{
    e.preventDefault();

    if (!formValues.decision || !formValues.observaciones) {
        alert("Los campos de decision y observaciones son obligatorios.");
        return;
      }


    try{
        const resultEdit = await axios.patch('http://localhost:3001/form/editresult', formValues)
        if(resultEdit.data[0] === 1){
        dispatch(getResultsUser({userId, placeId}))
            alert("Actualizado exitosamente")
            setEditing(false)
        }else{
            alert('No ha realizado ningun cambio')
            setEditing(false)
        }
    }catch(err){
        console.log(err)
    }
    
}


  return (
    <Form onSubmit={handleSubmit} className='border p-3'>
        <h2>{item_relevar}</h2>
      <Form.Group controlId="formDecision">
      <FormGroup className="my-3">
              <Form.Label>Relevar equipo</Form.Label>
              <Form.Check
              type="checkbox"
              label="Si"
              name="decision"
              value={'Si'}
              checked={formValues.decision === 'Si'}
              onChange={handleChange}
              disabled={!isEditing}
              style={{ backgroundColor: !isEditing ? 'lightgray' : 'white' }}
            />
                    <Form.Check
              type="checkbox"
              label="No"
              name="decision"
              value={'No'}
              checked={formValues.decision === 'No'}
              onChange={handleChange}
              disabled={!isEditing}
              style={{ backgroundColor: !isEditing ? 'lightgray' : 'white' }}
            />
          </FormGroup>
      </Form.Group>

      <Form.Group controlId="formObservaciones">
        <Form.Label>Observaciones</Form.Label>
        <Form.Control
          type="text"
          name="observaciones"
          placeholder="observaciones"
          value={formValues.observaciones}
          onChange={handleChange}
          readOnly={!isEditing}
          style={{ backgroundColor: !isEditing ? 'lightgray' : 'white' }}
        />
      </Form.Group>

      {isEditing ? (
        <>
          <Button variant="primary" type="submit">
            Guardar
          </Button>
          <Button variant="secondary" onClick={() => setEditing(false)}>
            Cancelar
          </Button>
        </>
      ) : (
        <Button variant="primary" onClick={() => setEditing(true)}>
          Editar
        </Button>
      )}
    </Form>
  );
};

export default EditForm;

