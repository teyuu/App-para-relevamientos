import React, { useState } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import { getResultsUser } from "../../redux/actions";
import { useDispatch } from "react-redux";
import axios from "axios";

const ResultEdit = ({
  item_relevar,
  decision,
  observaciones,
  userId,
  placeId,
  imagen,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [isSentImg, setIsSentImg] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formValues, setFormValues] = useState({
    item_relevar,
    decision,
    observaciones,
    userId,
    placeId,
    picUrl: "",
  });
  const [previewSource, setPreviewSource] = useState(imagen);

  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  console.log(formValues);

  const handleFileInputChange = async (e) => {
    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = async () => {
        setPreviewSource(reader.result);
        const response = await axios.post(
          "https://prodeman-api.onrender.com/uploadimg",
          {
            data: reader.result,
          }
        );

        if (!response.data) throw new Error(response.statusText);

        setFormValues({
          ...formValues,
          picUrl: response.data.url,
        });
        setIsUploading(false);
        setIsSentImg(true);
      };
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValues.decision || !formValues.observaciones) {
      alert("Los campos de decision y observaciones son obligatorios.");
      return;
    }

    try {
      const resultEdit = await axios.patch(
        "https://prodeman-api.onrender.com/editresult",
        formValues
      );
      if (resultEdit.data[0] === 1) {
        dispatch(getResultsUser({ userId, placeId }));
        alert("Actualizado exitosamente");
        setEditing(false);
      } else {
        alert("No ha realizado ningun cambio");
        setEditing(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="border border-success border-2 p-3  d-flex flex-column justify-content-between"
      
    >
      <h2>{item_relevar}</h2>
      <Form.Group controlId="formDecision">
        <FormGroup className="my-3">
          <Form.Label>Relevar equipo</Form.Label>
          <Form.Check
            type="checkbox"
            label="Si"
            name="decision"
            value={"Si"}
            checked={formValues.decision === "Si"}
            onChange={handleChange}
            disabled={!isEditing}
            style={{ backgroundColor: !isEditing ? "lightgray" : "white" }}
          />
          <Form.Check
            type="checkbox"
            label="No"
            name="decision"
            value={"No"}
            checked={formValues.decision === "No"}
            onChange={handleChange}
            disabled={!isEditing}
            style={{ backgroundColor: !isEditing ? "lightgray" : "white" }}
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
          style={{ backgroundColor: !isEditing ? "lightgray" : "white" }}
        />
      </Form.Group>
      <Form.Group>
        {previewSource && (
          <div>
            <input
              id="fileInput"
              type="file"
              name="image"
              onChange={handleFileInputChange}
              className="form-input"
              disabled={!isEditing}
            />
            <div className="p-3">
              <img
                src={previewSource}
                alt="chosen"
                style={{ width: "200px", height:"150px" }}
              />
            </div>
            {isUploading && <p>Subiendo imagen...</p>}
          </div>
        )}
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

export default ResultEdit;
