import livros from "../models/Livro.js";

export default {
  listarLivros: (req, res) => {
    livros
      .find()
      .populate("autor")
      .exec((err, livros) => {
        res.status(200).json(livros);
      });
  },

  listarLivroPorId: (req, res) => {
    const { id } = req.params;
    livros
      .findById(id)
      .populate("autor", "nome")
      .exec((err, livros) => {
        if (err) {
          res
            .status(400)
            .send({ message: `${err.message} - Id do livro não encontrado` });
        } else {
          res.status(200).send(livros);
        }
      });
  },

  cadastrarLivro: (req, res) => {
    let livro = new livros(req.body);

    livro.save((err) => {
      if (err) {
        res
          .status(500)
          .send({ message: `${err.message} - falha ao cadastrar livro.` });
      } else {
        res.status(201).send(livro.toJSON());
      }
    });
  },

  atualizarLivro: (req, res) => {
    const { id } = req.params;

    livros.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      (err) => {
        if (!err) {
          res.status(200).send({ message: "Livro atualizado com sucesso" });
        } else {
          res.status(500).send({ message: err.message });
        }
      }
    );
  },

  excluirLivro: (req, res) => {
    const { id } = req.params;

    livros.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: "Livro removido com sucesso" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  },

  listarLivroPorEditora: (req, res) => {
    const {editora} = req.query

    livros.find({editora : { $regex : new RegExp(editora, "i") }}, (err, livros)=> {
      res.status(200).send(livros)
    })
  }
};
