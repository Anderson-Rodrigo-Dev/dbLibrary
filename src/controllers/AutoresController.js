import autores from "../models/Autor.js";

export default {
  listarAutores: (req, res) => {
    autores.find((err, autores) => {
      res.status(200).json(autores);
    });
  },

  listarAutorPorId: (req, res) => {
    const { id } = req.params;
    autores.findById(id, (err, autores) => {
      if (err) {
        res
          .status(400)
          .send({ message: `${err.message} - Id do autor não encontrado` });
      } else {
        res.status(200).send(autores);
      }
    });
  },

  cadastrarAutor: (req, res) => {
    let autor = new autores(req.body);

    autor.save((err) => {
      if (err) {
        res
          .status(500)
          .send({ message: `${err.message} - falha ao cadastrar autor.` });
      } else {
        res.status(201).send(autor.toJSON());
      }
    });
  },

  atualizarAutor: (req, res) => {
    const { id } = req.params;

    autores.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      (err) => {
        if (!err) {
          res.status(200).send({ message: "autor atualizado com sucesso" });
        } else {
          res.status(500).send({ message: err.message });
        }
      }
    );
  },

  excluirAutor: (req, res) => {
    const { id } = req.params;

    autores.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: "autor removido com sucesso" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  },
};
