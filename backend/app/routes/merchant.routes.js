const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /**
  * @swagger
  * /v1/merchant:
  *   get:
  *     tags:
  *       - Merchant
  *     name: Merchant
  *     summary: Get all active merchants
  *     consumes:
  *       - application/json
  *     parameters:
  *       - name: x-access-token
  *         in: header
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         description: User found and logged in successfully
  *       401:
  *         description: Bad username, not found in db
  *       500:
  *         description: something error on system
  */
    app.get("/v1/merchant", controller.getMerchant);
};