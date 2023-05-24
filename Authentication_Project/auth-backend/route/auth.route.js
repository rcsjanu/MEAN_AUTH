
const controller = require("../controllers/auth.controller");
const { checkUserEmail } = require("../middlewares/verifyUser.middleware");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        // [
        //     checkUserEmail
        // ],
        controller.signup
    );

    app.post("/api/auth/signin", controller.signin);

    app.post("/api/auth/signout", controller.signout);
};
