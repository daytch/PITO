const config = require("../config/auth.config");
const User = require('../models/user');
const Role = require('../models/role');
const UserRoles = require('../models/userRole');
const emailconfig = require("../config/email.config");
const nodemailer = require("nodemailer");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {

    await Role.where({ 'name': 'User' })
        .fetch({ require: true })
        .then(role => {
            if (role) {
                User.forge({
                    username: req.body.username,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 8),
                }).save()
                    .then(user => {
                        UserRoles.forge({ userId: user.id, roleId: role.id })
                            .save()
                            .then(ur => {
                                console.log(ur);
                                res.send({ message: "User was registered successfully!", isSuccess: true });
                            })
                    }).catch(err => {
                        res.status(500).send({ message: err, isSuccess: false });
                    })
            }
        })
};

exports.signin = async (req, res) => {

    // User.forge()
    //     .query(function (qb) {
    //         qb.select('roles.name');
    //         qb.join('users_roles', 'users_roles.userId', '=', 'users.id');
    //         qb.join('roles', 'roles.userId', '=', 'users_roles.roleId');
    //         qb.where('users_roles.UserId', user.attributes.id);
    //     })
    //     .fetchAll({ withRelated: 'roles' })
    //     .then(result => {
    //         res.status(200).send({
    //             id: user.attributes.id,
    //             username: user.attributes.username,
    //             email: user.attributes.email,
    //             roles: result,
    //             accessToken: token,
    //             isSuccess: true
    //         });
    //     }).catch(err => {
    //         res.status(500).send({ message: err, isSuccess: false });
    //     });

    await User
        .where({ 'email': req.body.email })
        .fetch()
        .then(user => {
            if (!user) {
                return res.status(404).send({ isSuccess: false, message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.attributes.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            UserRoles.forge()
                .query(function (qb) {
                    qb.select('roles.name');
                    qb.join('roles', 'roles.id', '=', 'users_roles.roleId');
                    qb.where('users_roles.UserId', user.attributes.id);
                })
                .fetchAll({ withRelated: 'roles' })
                .then(result => {
                    res.status(200).send({
                        id: user.attributes.id,
                        username: user.attributes.username,
                        email: user.attributes.email,
                        roles: result,
                        accessToken: token,
                        isSuccess: true
                    });
                }).catch(err => {
                    res.status(500).send({ message: err, isSuccess: false });
                });
        }).catch(err => {
            res.status(500).send({ message: err.message, isSuccess: false });
        });
}; 

exports.forgotpassword = async (req, res) => {
  
    await User
        .where({ 'email': req.body.email })
        .fetch()
        .then(user => {
            if (!user) {
                return res.status(200).send({ isSuccess: true, message: "Please check your inbox to forgot / reset password." });
            }else{
                SendEmail(req.body.email);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message, isSuccess: false });
        });

};

async function SendEmail(email) {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: emailconfig.host,
      port: emailconfig.port,
      secure: emailconfig.SSL, // true for 465, false for other ports
      auth: {
        user: emailconfig.user,
        pass: emailconfig.password,
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: emailconfig.from, // sender address
      to: email, // list of receivers, allow multiple receivers
      subject: emailconfig.subject, // Subject line
      text: emailconfig.text, // plain text body
      html: emailconfig.content, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  