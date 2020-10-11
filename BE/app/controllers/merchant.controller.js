const db = require("../models");
const config = require("../config/auth.config");
const { sequelize } = require("../models");
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

exports.merchantList = (req, res) => {
    let { page, size, title } = req.query;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    title = title ? title : '';
    let query = title ? "SELECT * FROM `vw_merchant` LIMIT :limits, :offset WHERE name LIKE '%:like%' OR email LIKE '%:like%' " :
        "SELECT * FROM `vw_merchant`"; // LIMIT :limits, :offset";

    const { limit, offset } = getPagination(page, size);
    // console.log('limit: ' + limit + ', offset: ' + offset);
    // db.sequelize.query(query,
    //     { replecements: { limits: limit }, type: sequelize.QueryTypes.SELECT },
    //     { replacements: { offset: 12 }, type: sequelize.QueryTypes.SELECT })
    //     .then(merchants => {
    //         res.send(merchants);
    //         // res.send({ isSuccess: true, message: '', data: merchants });
    //     }).catch(err => {
    //         res.status(500).send({ message: err.message, isSuccess: false });
    //     })

    User.findAll({
        include: [
            // {
            //     model: UserRoles,
            //     where: { 'userId': 'id' },
            //     attributes: ['userId,roleId'],
            // }, {
            //     model: Role,
            //     where: [{ 'id': 'roleId' }, { 'name': 'merchant' }],
            //     attributes: ['name'],
            // },
            [sequelize.literal(`(SELECT
            v.userId        AS userid,
            SUM(v.like)     AS like,
            SUM(v.share)    AS share,
            FORMAT(SUM(v.rating) / COUNT(v.userId),2) AS rating,
            COUNT(v.userId) AS jumlah,
            MAX(v.startDate) AS lastsession
          FROM test.videos v
          WHERE v.userId = test.users.id
          GROUP BY v.userId)`), 'videos']
        ],
        attributes: ['id', 'username', 'email', 'like', 'share', 'rating', 'livestreams', 'jumlah', 'lastsession']
    })
        .then(users => {
            console.log(users);
            const response = getPagingData(users, page, limit);
            res.send(users);
            // res.send({ isSuccess: true, message: '', data: merchants });
        }).catch(err => {
            console.log(err);
            res.status(500).send({ message: err.message, isSuccess: false });
        })
};

exports.disableMerchant = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};