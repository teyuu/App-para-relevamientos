import React, { useState } from "react";
import { Form, FormControl, Button, Container,  FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getResultsUser } from "../../redux/actions";

const FormWithEditButton = ({ itemName, isImg }) => {

  const currentPlace = useSelector(state => state.currentPlace);
  const [isSent, setIsSent] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    item_relevar: itemName,
    decision: "",
    observaciones: "",
    placeId: parseInt(currentPlace[0][0].id),
    userId: parseInt(currentPlace[0][0].userId)
  });


  const [imgSrc, setImgSrc] = useState(null);
  const gotImg = isImg === 'Tomar Foto' ? true : false



  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const { decision, observaciones } = formData;

    if (!decision || !observaciones) {
      alert("Los campos de decision y observaciones son obligatorios.");
      return;
    }

    try {
      const result = await axios.post("http://localhost:3001/form/result", formData);
      if (result.data) {
        console.log(result.data)
        dispatch(getResultsUser({ userId: result.data.userId, placeId: result.data.placeId }));
        setIsSent(true)
        setFormData({
          ...formData,
          decision:"",
          observaciones:""
        })
        alert("Exito");
      }
    } catch (e) {
      alert('Para editar dirigase al formulario debejo');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const updateImg = ()=>{

    try{
      const result = axios.post('http://localhost:3001/form/uploadimg', imgSrc)
      if(result.data){
        alert('exitos')
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <Container className="border border-radius">
      
      <Form onSubmit={handleSubmit}>
        <h2>{itemName}</h2>
        <FormGroup className="my-3">
              <Form.Label>Relevar equipo</Form.Label>
              <Form.Check
              type="checkbox"
              label="Si"
              name="decision"
              value={'Si'}
              checked={formData.decision === 'Si'}
              onChange={handleChange}
            />
                    <Form.Check
              type="checkbox"
              label="No"
              name="decision"
              value={'No'}
              checked={formData.decision === 'No'}
              onChange={handleChange}
            />
          </FormGroup>
        
        <FormControl
          type="text"
          placeholder="Observaciones"
          name="observaciones"
          value={formData.observaciones}
          onChange={handleChange}
        />
        

        {gotImg && 
                  <div className="py-5">
                  <p>Subir foto</p>
                  <input type="file" onChange={(e) => handleFileChange(e)} />
                  {imgSrc  && <img style={{maxWidth:'200px'}} src={imgSrc} alt="Preview" />}
                  </div>
        }
        <Button type="submit" variant="success" disabled={isSent}>
          Enviar
        </Button>
      </Form>
    </Container>
  );
};

export default FormWithEditButton;

