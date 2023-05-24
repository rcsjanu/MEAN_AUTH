const db = require("../model");
const User = db.user;

checkUserEmail = (req, res, next) => {
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Email is already in use!" });
        return;
      }
      next();
    });
};


module.exports = {checkUserEmail};
