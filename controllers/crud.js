import conexion from "../database/db.js";

export const save = (req, res) => {
  const user = req.body.user;
  const email = req.body.email;
  const password = req.body.password;

  if (
    !user ||
    !email ||
    !password ||
    !user.trim() ||
    !email.trim() ||
    !password.trim()
  ) {
    return res
      .status(400)
      .json({ message: "Los campos no pueden estar vacíos" });
  }

  // Validar si el email ya está en uso
  conexion.query(
    "SELECT email FROM usuarios WHERE email = ?",
    [email],
    (error, results) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ error: "Ocurrió un error al verificar el email" });
      }

      if (results.length > 0) {
        return res.status(409).json({ message: "El email ya está en uso" });
      }

      // Insertar el nuevo usuario si el email no está en uso
      conexion.query(
        "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, AES_ENCRYPT(?, ?))",
        [user, email, password, user],
        (error, results) => {
          if (error) {
            console.error(error);
            return res.status(500).json({
              error: "Ocurrió un error al guardar en la base de datos",
            });
          } else {
            res.status(200).json({ success: true });
          }
        }
      );
    }
  );
};

export const edit = (req, res) => {
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;
  
    if (!user || !email || !password || !user.trim() || !email.trim() || !password.trim()) {
      return res.status(400).json({ message: "Los campos no pueden estar vacíos" });
    }
  
    let id = parseInt(req.params.id);
  
    // Validar si el email ya está en uso (excluyendo el usuario actual)
    conexion.query(
      "SELECT email FROM usuarios WHERE email = ? AND usuario_id != ?",
      [email, id],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Ocurrió un error al verificar el email" });
        }
  
        if (results.length > 0) {
          return res.status(409).json({ message: "El email ya está en uso" });
        }
  
        // Actualizar el usuario si el email no está en uso por otro usuario
        conexion.query(
          "UPDATE usuarios SET nombre = ?, email = ?, password = AES_ENCRYPT(?, ?) WHERE usuario_id = ?",
          [user, email, password, user, id],
          (error, results) => {
            if (error) {
              console.error(error);
              return res.status(500).json({ error: "Ocurrió un error al guardar en la base de datos" });
            } else {
              res.status(200).json({ success: true });
            }
          }
        );
      }
    );
  };