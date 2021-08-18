const fs = require( 'fs' )

const path = './dataBase/data.json'

const guardarDB = ( data ) => {
  fs.writeFileSync( path, JSON.stringify( data ) )
}

const leerDB = () => {
  if (!fs.existsSync( path )) return null
  return JSON.parse( fs.readFileSync( path, { encoding: 'utf-8' } ) )
};

module.exports = {
  guardarDB,
  leerDB,
}