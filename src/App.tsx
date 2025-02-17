import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import Swal from "sweetalert2";

function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState(0);
  const [id, setId] = useState(0);
  const [empleadosList, setEmpleadosList] = useState([]);
  const [editar, setEditar] = useState(false);

  const add = () => {
    axios
      .post("https://empleados-back.onrender.com/create", {
        nombre: nombre,
        edad: edad,
        pais: pais,
        cargo: cargo,
        anios: anios,
      })
      .then(() => {
        getEmpleados();
        limpiarCampos();
        Swal.fire({
          title: `${nombre} agregado!`,
          icon: "success",
          draggable: true,
          timer: 3000,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: JSON.parse(JSON.stringify(err)).message + ": intente mas tarde!",
        });
      });
  };

  const update = () => {
    axios
      .put("https://empleados-back.onrender.com/update", {
        id: id,
        nombre: nombre,
        edad: edad,
        pais: pais,
        cargo: cargo,
        anios: anios,
      })
      .then(() => {
        getEmpleados();
        limpiarCampos();
        Swal.fire({
          title: `${nombre} actualizado!`,
          icon: "success",
          draggable: true,
          timer: 3000,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: JSON.parse(JSON.stringify(err)).message + ": intente mas tarde!",
        });
      });
  };

  const deleteEmpleado = (val) => {
    Swal.fire({
      title: "Confirmar eliminado?",
      text: `Realmente desea eliminar a ${val.nombre}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("https://empleados-back.onrender.com/delete/" + val._id)
          .then(() => {
            getEmpleados();
            limpiarCampos();
            Swal.fire({
              title: "Eliminado!",
              text: `${val.nombre} ha sido eliminado!`,
              icon: "success",
              timer: 3000,
            });
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se logro eliminar el empleado!",
              footer: JSON.parse(JSON.stringify(err)).message,
            });
          });
      }
    });
  };

  const limpiarCampos = () => {
    setNombre("");
    setEdad(0);
    setCargo("");
    setPais("");
    setAnios(0);
    setId(0);
    setEditar(false);
  };

  const editarEmpleado = (val: any) => {
    setEditar(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setCargo(val.cargo);
    setPais(val.pais);
    setAnios(val.anios);
    setId(val._id);
  };

  const getEmpleados = () => {
    axios.get("https://empleados-back.onrender.com/empleados").then((response) => {
      setEmpleadosList(response.data);
    });
  };

  useEffect(() => {
    getEmpleados();

  }, [])
  


  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">Gestión de empleados</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre:
            </span>
            <input
              type="text"
              onChange={(e) => setNombre(e.target.value)}
              className="form-control"
              placeholder="Ingresa el nombre y apellido"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={nombre}
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon2">
              Edad:
            </span>
            <input
              type="number"
              onChange={(e) => setEdad(e.target.value)}
              className="form-control"
              placeholder="Ingresa la edad"
              aria-label="Username"
              aria-describedby="basic-addon2"
              value={edad}
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon3">
              País:
            </span>
            <input
              type="text"
              onChange={(e) => setPais(e.target.value)}
              className="form-control"
              placeholder="Ingresa el pais de nacimiento"
              aria-label="Username"
              aria-describedby="basic-addon3"
              value={pais}
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon4">
              Cargo:
            </span>
            <input
              type="text"
              onChange={(e) => setCargo(e.target.value)}
              className="form-control"
              placeholder="Ingresa el cargo"
              aria-label="Username"
              aria-describedby="basic-addon4"
              value={cargo}
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon5">
              Años de experiencia:
            </span>
            <input
              type="number"
              onChange={(e) => setAnios(e.target.value)}
              className="form-control"
              placeholder="Ingresa los años de experiencia"
              aria-label="Username"
              aria-describedby="basic-addon5"
              value={anios}
            />
          </div>
        </div>
        <div className="card-footer text-muted">
          {editar ? (
            <div className="d-flex gap-2 justify-content-center">
              <button className="btn btn-warning" onClick={update}>
                Actualizar
              </button>
              <button className="btn btn-danger" onClick={limpiarCampos}>
                Cancelar
              </button>
            </div>
          ) : (
            <button className="btn btn-success" onClick={add}>
              Registrar
            </button>
          )}
        </div>
      </div>

      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleadosList.map((item, key) => {
            return (
              <tr key={key}>
                <th>{key  + 1}</th>
                <td>{item.nombre}</td>
                <td>{item.edad}</td>
                <td>{item.pais}</td>
                <td>{item.cargo}</td>
                <td>{item.anios}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      onClick={() => editarEmpleado(item)}
                      className="btn btn-info"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        deleteEmpleado(item);
                      }}
                      className="btn btn-danger"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
