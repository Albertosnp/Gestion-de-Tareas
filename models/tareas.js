/**
 * _listado: 
 *  { uuid-54545454: {id: 12 , desc: 'sdasd', completadoEn: 454521212}}
 *  { uuid-54545454: {id: 12 , desc: 'sdasd', completadoEn: 454521212}}
 *  { uuid-54545454: {id: 12 , desc: 'sdasd', completadoEn: 454521212}}
 */
require('colors')
const Tarea = require("./tarea");

class Tareas {

  constructor() {
    this._listado = {}
  }

  creaTarea(desc = '') {
    const newTarea = new Tarea(desc);
    this._listado[newTarea.id] = newTarea;
  }

  get listarTareas() {
    const listado = [];
    for (const key in this._listado) {
      listado.push(this._listado[key]);
    }
    return listado;
  }

  get listarTareasPendientes() {
    const listado = [];
    for (const key in this._listado) {
      if (!this._listado[key].completadoEn) {
        listado.push(this._listado[key]);
      }
    }
    return listado;
  }

  listadoPendientesCompletadas(completadas = true) {
    this.listarTareas.forEach((tarea, index) => {
      if (completadas && tarea.completadoEn) 
        return console.log(`${++index}: `.green + `${tarea.desc} completada en ${tarea.completadoEn.green}`)
      if (completadas === false && !tarea.completadoEn) 
        return console.log(`${++index}: `.red + `${tarea.desc}` + ` pendiente`.red)
    })   
  }

  listadoCompleto() {
    let index = 0;
    for (const key in this._listado) {
      const tarea = this._listado[key];
      console.log(`${++index}. `.green + `${tarea.desc} :: ${tarea.completadoEn ? 'Completado'.green : 'Pendiente'.red }`);
    }  
  }

  cargarTareas(listado = []) {
    listado.forEach(tarea => {
      this._listado[tarea.id] = tarea;
    });
  }

  borrarTarea(id) {
    delete this._listado[id];
    console.log(`Tarea ` + `${id}`.gray + ` borrada correctamente`);
  }

  completaTareas(tareasAcompletar) {
    tareasAcompletar.forEach(id => {
      if (!this._listado[id].completadoEn) 
        this._listado[id].completadoEn = new Date().toLocaleString();
    });
    //Para hacer toggle de completado
    this.listarTareas.forEach(tarea => {
      if (!tareasAcompletar.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    })
  }
}

module.exports = Tareas;