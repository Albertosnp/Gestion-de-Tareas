require('colors');
const { guardarDB, leerDB } = require('./helpers/services');
const { inquirerMenu, pause, leerInput, borrarTarea, confirmar, completaTareas } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async () => {
  let option = '';
  const tareas = new Tareas()
  //Carga la base de datos si existe
  const tareasEnDB = leerDB();
  if ( tareasEnDB ) tareas.cargarTareas(tareasEnDB);  
  do {
    
    option = await inquirerMenu()
 
    switch (option) {
      case '1':
        const nombreTarea = await leerInput('Nombre de la tarea:')
        tareas.creaTarea(nombreTarea)
        break;
      case '2':
        tareas.listadoCompleto()
        break;
      case '3':
        tareas.listadoPendientesCompletadas()
        break;
      case '4':
        tareas.listadoPendientesCompletadas(false)
        break;
      case '5':
        const tareasAcompletar = await completaTareas(tareas.listarTareas)
        tareas.completaTareas(tareasAcompletar)
        break;
      case '6':
        const idTarea = await borrarTarea(tareas.listarTareas);
        if (idTarea !== '0') {
          const decision = await confirmar();
          if (decision) tareas.borrarTarea(idTarea);
        }
        break;
      default:
        break;
    }
    guardarDB( tareas.listarTareas )
    await pause();
  } while (option !== '0');

};



main();
