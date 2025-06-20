require('dotenv').config();

const User = require('../schemas/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

exports.register = (req, res) => {
  const { nom, email, motDePasse, dateInscription } = req.body;

  bcrypt.hash(motDePasse, saltRounds, (err, hash) => {
    const user = new User({
      nom,
      email,
      motDePasse: hash,
      dateInscription,
    });

    user
      .save()
      .then(() =>
        res.status(201).json({ message: "Utilisateur créé avec succès" })
      )
      .catch((error) =>
        res.json({ error: "Erreur lors de la création de l'utilisateur" })
      );
  });
    
};

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ message: "Utilisateur non trouvé" });
        }
        bcrypt
          .compare(req.body.motDePasse, user.motDePasse)
          .then((valide) => {
            if (!valide) {
              return res
                .status(401)
                .json({ message: "Mot de passe incorrect" });
            }
            res.status(200).json({
              token: jwt.sign(
                {
                  userId: user._id,
                },
                process.env.JWT_SECRET,
                {
                  expiresIn: "1h", 
                }
              ),
            });
          })
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(400).json({ error }));
}

exports.getAllUser = (req, res) => {
    User.find()
        .then((users) => res.status(200).json(users))
        .catch((error) => res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" }));
    
}