const db = require("../models");
const config = require("../config/auth.config");
const Merchant = db.merchant;
const User = db.user;
const Role = db.role;
const UserRoles = db.userroles;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    console.log(data);
    const { count: totalItems, rows: tutorials } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, tutorials, totalPages, currentPage };
};


exports.userList = (req, res) => {
    let { page, size, title } = req.query;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    title = title ? title : '';
    let query = title ? "SELECT * FROM `vw_user` LIMIT :limits, :offset WHERE name LIKE '%:like%' OR email LIKE '%:like%' " :
        "SELECT * FROM `vw_user` LIMIT :limits, :offset";

    const { limit, offset } = getPagination(page, size);

    User.findAll({
        include: [{
            model: Role,
            where: { 'name': 'user' },
            attributes: ['name'],
        }],
        attributes: ['id', 'username', 'email',]
    })
        .then(users => {
            console.log(users);
            const response = getPagingData(users, page, limit);
            res.send(users);
            // res.send({ isSuccess: true, message: '', data: merchants });
        }).catch(err => {
            res.status(500).send({ message: err.message, isSuccess: false });
        })
};
