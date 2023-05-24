const config = require("../config/auth.config");
const db = require("../model");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const user = new User({
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        address: req.body.address,
        DOB: req.body.DOB
    });
    user.save().then(() => {
        res.status(200).send("User registered...")
    }).catch((err) => {
        console.log(err);
    })
};

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({ message: "Invalid Password!" });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400,
        });
        console.log(req.session)
        // req.session.token = token;
        res.status(200).send({
            id: user._id,
            email: user.email,
            username: user.firstname + ' ' + user.lastname
        });
    }).catch((err) => {
        res.status(500).send({ message: err });
        return;
    });
};

exports.signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
        this.next(err);
    }
};
