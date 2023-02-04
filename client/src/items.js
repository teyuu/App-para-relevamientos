const items = [
{'id':0, "item":'Rack principal(limpieza)', "belongsTo":["casaPrincipal","exAgroinsumos", "taller","hangar","balanza"]},
{'id':1, "item":'Rack principal(orden)', "belongsTo":["casaPrincipal","exAgroinsumos", "taller","hangar","balanza"]},
{'id':2, "item":'Funcionamiento AP', "belongsTo":["casaPrincipal","exAgroinsumos", "taller","hangar","balanza","agroInsumos"]},
{'id':3, "item":'Funcionamiento Telefono', "belongsTo":["casaPrincipal", "taller","hangar","hangarOficina","balanza"]},
{'id':4, "item":'UPS', "belongsTo":["casaPrincipal","balanza"]},
{'id':5, "item":'Limpiar PC', "belongsTo":["casaPrincipal", "taller","hangar","hangarOficina","balanza"]},
{'id':6, "item":'Acomodar Cables', "belongsTo":["hangarOficina"]},
{'id':7, "item":'Chequear Visualizaciones', "belongsTo":["camaras"]}
]


const options = [
    { value: "casaPrincipal", label: "Casa principal" },
    { value: "exAgroinsumos", label: "ExAgroinsumos" },
    { value: "taller", label: "Taller" },
    { value: "hangar", label: "Hangar" },
    { value: "hangarOficina", label: "Hangar oficina" },
    { value: "balanza", label: "Balanza" },
    { value: "agroInsumos", label: "AgroInsumos" },
    { value: "camaras", label: "Camaras" },
  ];

export default items;

