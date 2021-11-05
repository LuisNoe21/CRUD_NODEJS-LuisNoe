const express = require("express");
const router = express.Router();

//Invocamos a la conexion de la DB
const conexion = require("./database/db");


//RUTA PARA MOSTRAR TODOS LOS REGISTROS
router.get("/", (req, res) => {
  conexion.query(`
      SELECT
      categorias.categoria AS categoria,
      producto,
      productos.id as id,
      precio,
      disponibles
      FROM productos
      LEFT JOIN categorias
      ON productos.categoria = categorias.id;
    `, (error, result) => {
    if (error) {
      throw error;
    } else {
      res.render("index.ejs", { data: result });
    }
  });
});

//RUTA PARA MOSTRAR TODOS LOS REGISTROS CATEGORIAS
router.get("/categorias", (req, res) => {
  conexion.query("SELECT * FROM categorias", (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render("indexcategoria.ejs", { data: results });
    }
  });
});

//RUTA QUE NOS LLEVA AL FORMULARIO PARA DAR DE ALTA UN NUEVO REGISTRO
router.get("/create", (req, res) => {
  conexion.query("SELECT * FROM categorias", (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render("create", {
        data: results
      });
    }
  });
});

router.get("/create-category", (req, res) => {
  res.render("create-category");
});

router.post("/save-category", (req, res) => {

  const { nombre, desc } = req.body;

  conexion.query(`
    INSERT INTO categorias(categoria, descripcion)
    VALUES("${nombre}", "${desc}")
    `, (error, results) => {
    if (error) {
      throw error;
    } else {
      res.redirect('/categorias');
    }
  });

});


//RUTA PARA EDITAR UN REGISTRO SELECCIONADO
router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  conexion.query(
    "SELECT * FROM productos WHERE id=?",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        conexion.query(
          "SELECT * FROM categorias",
          (error, data) => {
            if (error) {
              throw error;
            } else {
              res.render("edit.ejs", { producto: results[0], data });
            }
          }
        );
      }
    }
  );
});

router.get("/edit-category/:id", (req, res) => {
  const id = req.params.id;
  conexion.query(
    "SELECT * FROM categorias WHERE id=?",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render("edit-category.ejs", { data: results[0] });
      }
    }
  );
});

router.post("/update-category", (req, res) => {
  const { id, nombre, desc } = req.body;
  conexion.query(
    `UPDATE categorias SET categoria = "${nombre}", descripcion = "${desc}" WHERE id = ${id}`,
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.redirect("/categorias");
      }
    }
  );
});

//RUTA PARA ELIMINAR UN REGISTRO SELECCIONADO
router.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  conexion.query(
    "DELETE FROM productos WHERE id = ?",
    [id],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/");
      }
    }
  );
});

router.get("/delete-category/:id", (req, res) => {
  const id = req.params.id;
  conexion.query(
    "DELETE FROM categorias WHERE id = ?",
    [id],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/categorias");
      }
    }
  );
});

//RUTA para contacto
router.get("/contacto", (req, res) => {
  res.render("contacto");
});

//Invocamos los metodos para el CRUD
const crud = require("./controllers/crud");
const { json } = require("express");

// usamos router.post porque en el formulario el method="POST"
router.post("/save", crud.save);
router.post("/update", crud.update);

module.exports = router;
