const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

var corsOptions = {
  origin: ["http://localhost:8081","http://localhost:3000"]
};


if (dbConfig.swagger) {
  const swaggerDefinition = {
    info: {
      title: 'PITO API',
      description: 'PITO API Information',
      contact: {
        name: 'me@nurulhidayat.com'
      },
      servers: ["localhost:8080"]
    },
    host: 'localhost:8080',
    basePath: '/',
    securityDefinitions: {
      ApiKeyAuth: {
        type: 'apiKey',
        name: 'X-API-Key',
        scheme: 'x-access-token',
        in: 'header'
      }
    }
  }

  const options = {
    swaggerDefinition,
    apis: ["./app/routes/**.js"]
  }

  const swaggerSpec = swaggerJSDoc(options);
  app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to PITO application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/merchant.routes')(app);


const db = require("./app/models");
db.sequelize.sync(); // for production
const Role = db.role;
const User = db.user;
const bcrypt = require("bcryptjs");

// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "merchant"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
  
  User.create({
    username: 'udin@yopmail.com',
    email: 'udin@yopmail.com',
    password: bcrypt.hashSync('123', 8),
    registerfrom: 'Application',
    isactive: 1
  }).then(user => {
    user.setRoles([1, 2, 3]);
  })
}