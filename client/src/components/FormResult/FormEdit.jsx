import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getResultsUser } from "../../redux/actions";
import {
  Form,
  FormControl,
  Button,
  Container,
  FormGroup,
} from "react-bootstrap";

const FormEdit = ({ itemName, isImg }) => {
  const currentPlace = useSelector((state) => state.currentPlace);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    item_relevar: itemName,
    decision: "",
    observaciones: "",
    placeId: parseInt(currentPlace[0][0].id),
    userId: parseInt(currentPlace[0][0].userId),
    picUrl: "",
  });
  const [isSent, setIsSent] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSentImg, setIsSentImg] = useState(false);

  //Upload Img estados
  const [previewSource, setPreviewSource] = useState("");
  const [fileInputstate, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState();


  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      setIsSentImg(false)
    };
  };
  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);

    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
    };
    
  };
  const uploadImage = async (base64EncodedImage) => {
    setIsUploading(true);
    try {
      const response = await axios.post(
        "https://prodeman-api.onrender.com/uploadimg",
        { data: base64EncodedImage }
      );
      setFormData({
        ...formData,
        picUrl: response.data.url,
      });
      setFileInputState("");
      setIsUploading(false);
      setIsSentImg(true)
    } catch (err) {
      console.error(err);
    }
  };



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  //Funcion handleSubmit que realiza un post de los datos del form y almacena en la bd
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { decision, observaciones, picUrl } = formData;

    if(isImg){
      if (!decision || !observaciones ) {
        alert("Los campos de decision, observaciones y foto son obligatorios.");
        return;
      }
      if(decision && observaciones && !picUrl){
        alert("Por favor confirme la imagen para continuar")
        return;
      }
    }
    //No se permiten campos vacios
    if (!decision || !observaciones) {
      alert("Los campos de decision y observaciones son obligatorios.");
      return;
    }
    try {
      const result = await axios.post(
        "https://prodeman-api.onrender.com/result",
        formData
      );
      if (result.data) {
        //Dispatch para que se obtengan los datos cargados y se muestran para editar debajo
        dispatch(
          getResultsUser({
            userId: result.data.userId,
            placeId: result.data.placeId,
          })
        );
        setIsSent(true);
        setPreviewSource("");
        setFormData({
          ...formData,
          decision: "",
          observaciones: "",
          picUrl: "",
        });
        alert("Exito");
      }
    } catch (e) {
      setFormData({
        ...formData,
        decision: "",
        observaciones: "",
        picUrl: "",
      });
      // setPreviewSource("")
      alert("Para editar dirigase al formulario debejo");
      console.error(e);
    }
  };

  return (
    <Container className="border border-radius col-12 col-md-6 mb-3">
      <Form onSubmit={handleSubmit}>
        <h2>{itemName}</h2>
        <FormGroup className="my-3">
          <Form.Label>Relevar equipo</Form.Label>
          <Form.Check
            type="checkbox"
            label="Si"
            name="decision"
            value="Si"
            checked={formData.decision === "Si"}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="No"
            name="decision"
            value="No"
            checked={formData.decision === "No"}
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

        {isImg && (
          <div className="py-5">
            <input
              id="fileInput"
              type="file"
              name="image"
              value={fileInputstate}
              onChange={handleFileInputChange}
              className="form-input"
            />
  
            {previewSource && (
              <div >
                <div className="p-3">
                <img
                  src={previewSource}
                  alt="chosen"
                  style={{ height: "200px" }}
                />
                </div>
                <button className="btn btn-secondary" onClick={handleSubmitFile} disabled={isSentImg}>Confirmar imagen</button>
                {isUploading && <p>Subiendo imagen...</p>}
              </div>
            )}
          </div>
        )}

        <Button type="submit" variant="success" disabled={isSent}>
          Enviar
        </Button>
      </Form>
    </Container>
  );
};

export default FormEdit;
