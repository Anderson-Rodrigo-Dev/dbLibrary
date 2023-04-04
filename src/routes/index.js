import express from "express";
import livros from "./LivrosRoutes.js";
import autores from "./autoresRoutes.js";

function routes(app) {
  app.route("/").get((req, res) => {
    res.status(200).send({ titulo: "Curso de Node" });
  });

  app.use(express.json(), livros, autores);
}

export default routes;