const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const { verifySignUp } = require("../middlewares");
const express = require('express');
const app = express();
app.use(express.json());
const router = express.Router()


app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

//sign up route
router.route(
    "/signup").post(
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted,
    controller.signup
);

//login route
router.route("/signin").post(controller.signin);


    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.get("/api/test/all", controller.allAccess);

    app.get(
        "/api/test/user", [authJwt.verifyToken],
        controller.userBoard
    );

    app.get(
        "/api/test/employers", [authJwt.verifyToken, authJwt.isEmployer],
        controller.employerBoard
    );

    app.get(
        "/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

module.exports = router