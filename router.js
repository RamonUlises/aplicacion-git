import { Router } from "express";
import conexion from "./database/db.js";
import { edit, save } from "./controllers/crud.js";


const router = Router();
//INICIO
router.get("/", (req,res) => {
    conexion.query('SELECT * FROM usuarios', (error, results) => {
        if(error){
            throw error;
        } else {
            res.render("index", {results})
        };
    });
});
//CREAR USUARIO
router.get("/create", (req, res) => {
    res.render("create");
    
});

router.post("/create", save);

//EDITAR

router.get("/edit/:id", (req, res) => {
    res.render("edit");
});

router.post("/edit/:id", edit)

//DELETE
router.get("/delete/:id", (req, res) => {
    let id = parseInt(req.params.id);
    conexion.query(
        'DELETE FROM usuarios WHERE usuario_id = ? ', [id], 
        (error, results) => {
            if(error){
               throw error;
            } else {
                res.redirect("/")
            }
        }
    )
});
export default router;