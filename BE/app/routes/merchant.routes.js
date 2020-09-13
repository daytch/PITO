const { authJwt } = require("../middlewares");
const controller = require("../controllers/merchant.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/v1/merchant", [authJwt.verifyToken, authJwt.isAdmin],controller.adminBoard);

    app.get("/v1/test/user",[authJwt.verifyToken],controller.userBoard);

    app.get("/v1/test/mod",[authJwt.verifyToken, authJwt.isMerchant],controller.moderatorBoard);

    app.get("/v1/test/admin",[authJwt.verifyToken, authJwt.isAdmin],controller.adminBoard);
};