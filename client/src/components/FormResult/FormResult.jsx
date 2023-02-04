import React from "react";
import { useSelector } from "react-redux";
import FormEdit from "./FormEdit";
import ResultEdit from "./ResultEdit";

const FormResult = () => {
  const currentPlace = useSelector((state) => state.currentPlace[0]);
  const results = useSelector((state) => state.results[0]);

  const elements = [
    {
      place: "casaPrincipal",
      elements: [
        { 0: "Rack Principal(limpieza)", 1: "Tomar Foto" },
        { 0: "Rack Principal(Orden)", 1: "Tomar Foto" },
        { 0: "Funcionamiento AP" },
        { 0: "Funcionamiento teléfono" },
        { 0: "UPS" },
      ],
    },
    {
      place: "exAgroinsumos",
      elements: [
        { 0: "Rack Principal(limpieza)", 1: "Tomar Foto" },
        { 0: "Rack Principal(Orden)", 1: "Tomar Foto" },
        { 0: "Funcionamiento AP" },
      ],
    },
    {
      place: "taller",
      elements: [
        { 0: "Rack Principal(limpieza)", 1: "Tomar Foto" },
        { 0: "Rack Principal(Orden)", 1: "Tomar Foto" },
        { 0: "Funcionamiento telefono" },
        { 0: "Funcionamiento AP" },
      ],
    },
    {
      place: "hangar",
      elements: [
        { 0: "Rack Principal(limpieza)", 1: "Tomar Foto" },
        { 0: "Rack Principal(Orden)", 1: "Tomar Foto" },
        { 0: "Funcionamiento telefono" },
        { 0: "Funcionamiento AP" },
      ],
    },
    {
      place: "hangarOficina",
      elements: [
        { 0: "Funcionamiento telefono" },
        { 0: "Limpiar PC", 1: "Tomar Foto" },
        { 0: "Acomodar cables", 1: "Tomar Foto" },
      ],
    },
    {
      place: "balanza",
      elements: [
        { 0: "Rack Principal(limpieza)", 1: "Tomar Foto" },
        { 0: "Rack Principal(Orden)", 1: "Tomar Foto" },
        ,
        { 0: "Funcionamiento AP" },
        { 0: "Limpiar PC", 1: "Tomar Foto" },
        { 0: "UPS" },
        { 0: "Funcionamiento teléfono" },
      ],
    },
    { place: "agroInsumos", elements: [{ 0: "Funcionamiento AP" }] },
    { place: "camaras", elements: [{ 0: "Chequear visualizacion" }] },
  ];

  if (currentPlace && currentPlace[0]) {
    const { name } = currentPlace[0];
    const { elements: filteredElements } =
      elements.find((e) => e.place === name) || {};
    return (
      <div className="container text-center border">
        <h5 className="text-center">Usted se encuentra actualmente en: </h5>
        <h2>{name}</h2>
        {/* ---------------------------------------------------------- */}
        <div className="row">
          {filteredElements?.map((e) => (
            <div key={e[0]} className="col-12 col-md-6 mb-3">
              <FormEdit itemName={e[0]} isImg={e[1]} />
            </div>
          ))}
        </div>
        {/* ---------------------------------------------------------- */}
        <h2>Editar resultados </h2>
        <div className="d-flex gap-3 flex-column flex-lg-row align-items-center">
          {results?.map((e) => {
            return (
              <ResultEdit
                key={e.id}
                item_relevar={e.item_relevar}
                decision={e.decision}
                observaciones={e.observaciones}
                placeId={e.placeId}
                userId={e.userId}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div />;
  }
};

export default FormResult;
