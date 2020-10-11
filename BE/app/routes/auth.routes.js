const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

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
* /v1/auth/signup:
*   post:
*     tags:
*       - Authentication
*     name: Authentication
*     summary: Register User
*     consumes:
*       - application/json
*     parameters:
*       - name: request
*         in : body
*         type: object
*         schema:
*           $ref: '#/definitions/auth'
*           type: object
*           properties:
*             username:
*               type: string
*             email:
*               type: string
*             telp:
*               type: string
*             password:
*               type: string
*               format: password
*         required:
*           - username
*           - password
*           - telp
*           - email
*     responses:
*       200:
*         description: User found and logged in successfully
*       401:
*         description: Bad username, not found in db
*       500:
*         description: something error on system
*   definitions:
*   inBody:
*       type: object
*       properties:
*           username:
*               type: string
*               example: Daytch
*           password:
*               type: string
*               example: 123
*           email:
*               type: string
*               example: me@nurulhidayat.com
*           telp:
*               type: string
*               example: 0858 6666 1326
*/
    app.post("/v1/auth/signup", [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], controller.signup);

    
  /**
* @swagger
* /v1/auth/signin:
*   post:
*     tags:
*       - Authentication
*     name: Authentication
*     summary: Log In to application
*     consumes:
*       - application/json
*     parameters:
*       - name: request
*         in : body
*         type: object
*         schema:
*           $ref: '#/definitions/auth'
*           type: object
*           properties:
*             email:
*               type: string
*             password:
*               type: string
*               format: password
*         required:
*           - email
*           - password
*     responses:
*       200:
*         description: User found and logged in successfully
*       401:
*         description: Bad username, not found in db
*       500:
*         description: something error on system
*   definitions:
*   inBody:
*       type: object
*       properties:
*           username:
*               type: string
*               example: Daytch
*           password:
*               type: string
*               example: 123
*/
    app.post("/v1/auth/signin", controller.signin);
};