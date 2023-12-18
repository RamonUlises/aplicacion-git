import mysql2 from "mysql2";

const conexion = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "57810634",
    database: "crud_usuarios",
});

conexion.connect(error => {
    if(error) return console.error(error);

    console.log("Concetado a la bd")
});

export default conexion;